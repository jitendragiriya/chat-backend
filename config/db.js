const mongoose = require("mongoose");

const ConnectDb = async () => {  
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Database connected successfully."))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDb;
