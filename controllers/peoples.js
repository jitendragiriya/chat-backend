// Error handler
const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const User = require("../Models/UsersModel");

//get all users
exports.getAllUsers = CatchAsyncError(async (req, res, next) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  await res.status(200).json(users);
});
