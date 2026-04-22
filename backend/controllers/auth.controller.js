// Auth controller

const bcrypt = require("bcryptjs");
const {
  getData,
  insertData,
} = require("../utils/dbHelper");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenHelper");

const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");


//  REGISTER
//  REGISTER
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields required");
    }

    // check existing
    const existing = await getData("users", { email });

    if (existing.length) {
      throw new ApiError(400, "Email already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const userId = await insertData("users", {
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
    });

    return res
      .status(201)
      .json(new ApiResponse(201, { userId }, "User registered"));

  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const users = await getData("users", { email });

    if (!users.length) {
      throw new ApiError(400, "Invalid credentials");
    }

    const user = users[0];

    // check status
    if (user.status === "blocked") {
      throw new ApiError(403, "User blocked");
    }

    // password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }

    // tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
          },
        },
        "Login successful"
      )
    );

  } catch (error) {
    next(error);
  }
};


const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new ApiError(401, "No refresh token");
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const users = await getData("users", { id: decoded.id });

    if (!users.length) {
      throw new ApiError(401, "User not found");
    }

    const newAccessToken = generateAccessToken(users[0]);

    return res.json(
      new ApiResponse(200, { accessToken: newAccessToken }, "Token refreshed")
    );

  } catch (error) {
    next(new ApiError(401, "Invalid refresh token"));
  }
};
