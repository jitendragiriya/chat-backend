const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("files"));

// importing the configuration file when app is not in production.
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

app.use(
  cors({
    origin: [
      `${process.env.DEVELOPMENT_CORS}`,
      `${process.env.PRODUCTION_CORS}`,
    ],
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
