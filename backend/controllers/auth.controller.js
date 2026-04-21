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


//  REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // check existing
    const existing = await getData("users", { email });

    if (existing.length) {
      return res.status(400).json({ message: "Email already exists" });
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

    res.status(201).json({
      message: "User registered",
      userId,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await getData("users", { email });

    if (!users.length) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // check status
    if (user.status === "blocked") {
      return res.status(403).json({ message: "User blocked" });
    }

    // password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const users = await getData("users", { id: decoded.id });

    if (!users.length) {
      return res.status(401).json({ message: "User not found" });
    }

    const newAccessToken = generateAccessToken(users[0]);

    res.json({
      accessToken: newAccessToken,
    });

  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
