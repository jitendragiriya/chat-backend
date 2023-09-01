const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const User = require("../Models/UsersModel");
const sendToken = require("../Utils/SendToken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

/**
 *  auth
 */

exports.googleAuth = CatchAsyncError(async (req, res, next) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  let user = await User.findOne({ email });
  if (user?._id) {
    await User.updateOne(
      { email },
      {
        email,
        name,
        picture,
        username: email.replace("@gmail.com", ""),
      }
    );
    sendToken(user, 200, res);
  } else {
    user = await User.create({
      email,
      name,
      picture,
    });
    sendToken(user, 200, res);
  }
});

// ==============is user already loggedin====================
exports.authUser = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
});
