const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const passportSetup = require("./passport")
const cookieSession = require("cookie-session");

const app = express();

const userRouter = require("./routes/authRoutes");

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
// const { requireSignIn } = require("./middleware/authMiddleware");

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
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["helloThere"],
    maxAge: 30 * 24 * 60 * 60,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
// app.use('/session', sessionRouter);

app.get("/", (req, res) => {
  res.status(200).json({message:"User Auth service"});
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running🚀: http://localhost:5000/");
});
