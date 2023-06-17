const mongoose = require("mongoose");

const ConnectDb = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database connected successfully."))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDb;
