// User module is here
const User = require("../Models/UsersModel");
const Message = require("../Models/Message");

// Error handler
const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");

exports.saveMessage = async (senderId, receiverId, message,sentAt) => {
   await Message.create({
    senderId,
    receiverId,
    message,
    sentAt
  }); 
};

// ==============get convesation between users====================
exports.getUserconversation = CatchAsyncError(async (req, res, next) => { 
  const messages = await Message.find({
    $or: [
      { $and: [{ senderId: req.user._id }, { receiverId: req.params.id }] },
      {
        $and: [{ senderId: req.params.id }, { receiverId: req.user._id }],
      },
    ],
  });

  res.status(200).json(messages);
});

// ==============get users====================
exports.getChatUser = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("There is no user with id!"));
  }
  res.status(200).json(user);
});
