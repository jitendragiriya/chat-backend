const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors"); 

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("files"));

app.use(
  cors({
    origin: `https://myshop-chatapp.netlify.app`,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const user = require("./routes/UserRoute");
// api
app.use("/api", user);

app.get("/", (req, res) => {
  res.send("Api running...");
});

module.exports = app;
