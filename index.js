const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

const userRouter = require("./routes/authRoutes");
const testRouter = require("./routes/testRoutes");
const professionalRouter = require("./routes/professionalRoutes");
const clientRouter = require("./routes/clientRoutes");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/test", testRouter);
app.use("/professional", professionalRouter);
app.use("/client", clientRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "sukoon web service" });
});

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server Running🚀");
  });
});
