const {
  getData,
  insertData,
  updateData,
  deleteData,
} = require("../../utils/dbHelper");

const { ApiResponse } = require("../../utils/ApiResponse");
const { ApiError } = require("../../utils/ApiError");


//  Add Address
//  Add Address
exports.addAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { full_name, phone, address, city, state, pincode } = req.body;

    if (!full_name || !phone || !address) {
      throw new ApiError(400, "Required fields missing");
    }

    const id = await insertData("addresses", {
      user_id: userId,
      full_name,
      phone,
      address,
      city,
      state,
      pincode,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, { id }, "Address added"));

  } catch (error) {
    next(error);
  }
};

exports.getAddresses = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const addresses = await getData("addresses", { user_id: userId });

    return res.json(new ApiResponse(200, addresses, "Addresses fetched"));

  } catch (error) {
    next(error);
  }
};


exports.updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    await updateData("addresses", req.body, { id });

    return res.json(new ApiResponse(200, null, "Address updated"));

  } catch (error) {
    next(error);
  }
};


exports.deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteData("addresses", { id });

    return res.json(new ApiResponse(200, null, "Address deleted"));

  } catch (error) {
    next(error);
  }
};

