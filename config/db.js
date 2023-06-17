const mongoose = require("mongoose");

const ConnectDb = async () => {
  await mongoose
    .connect(process.env.DB_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex:true, 
      useFindAndModify:false
    })
    .then(() => console.log("Database connected successfully."))
    .catch((error) => {
      console.log("Database is not connected...\n\n",error);
    });
};

module.exports = ConnectDb;
