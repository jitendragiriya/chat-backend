const SendToken = async (user, statusCode, res) => {
  const token = await user.getAuthToken()

  res.status(statusCode).json({token})
};

module.exports = SendToken;
