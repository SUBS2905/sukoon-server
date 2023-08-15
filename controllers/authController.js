const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Successful authentication
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //Create verification token
    const token = uuid();

    // Create a new user
    const newUser = new User({
      user_token: token,
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Successful registration
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    // Check if the user with the given token exists
    const user = await User.findOne({ user_token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Successful

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const authHeader = await req.headers.authorization;
    // console.log(user_token);
    if (!authHeader) {
      return res.status(401).json({ message: "Auth Header missing" });
    }
    const token = authHeader.split(" ")[1];
    const user = await User.findOne({ user_token: token });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const authHeader = await req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Auth Header missing" });
    }
    const token = authHeader.split(" ")[1];
    const user = await User.findOne({ user_token: token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const { fullname, phone, emergencycontact, dob, gender } = req.body;

      user.profile = {
        fullname,
        phone,
        emergencycontact,
        dob,
        gender,
      };

      await user.save();
      res.status(200).json(user);
    }

    res.status(201).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  signUp,
  signIn,
  verifyEmail,
  getUser,
  userProfile,
};
