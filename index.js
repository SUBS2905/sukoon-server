const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

const userRouter = require("./routes/authRoutes");

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/sukoon")
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "sukoon web service" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running🚀: http://localhost:5000/");
});
