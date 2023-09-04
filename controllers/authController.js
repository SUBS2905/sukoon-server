const User = require("../models/user");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const sendEmail = require("../utilities/sendEmail");

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
    const { username, email, password, isProfessional } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //Create verification token
    const userToken = uuid();
    const verificationToken = uuid();

    // Create a new user
    const newUser = new User({
      user_token: userToken,
      verification_token: verificationToken,
      username,
      email,
      password: hashedPassword,
      isProfessional,
    });

    // Save the new user to the database
    await newUser.save();

    // Send Verification email
    const verificationRoute = `${process.env.FRONTEND_URI}/verify-email?vtoken=${verificationToken}`;
    const emailContent = `
    <p>Click on the link below to verify your email</p>
    <a href=${verificationRoute}>${verificationRoute}</a>
    <br>
    <h5>Team Sukoon</h5>
    `;

    sendEmail(email, "Sukoon: Verify your email", emailContent);

    // Successful registration
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
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
      const { firstname, lastname, phone, emergencycontact, dob, gender } =
        req.body;

      user.profile = {
        firstname,
        lastname,
        phone,
        emergencycontact,
        dob,
        gender,
      };

      await user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const professionalProfile = async (req, res) => {
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
      const { firstname, lastname, gender, dob, contact, license_number, licensing_authority, experience, speciality} =
        req.body;

      user.professional = {
        firstname,
        lastname,
        gender,
        contact,
        dob,
        license_number,
        licensing_authority,
        experience,
        speciality
      };

      await user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { verification_token } = req.body;
    const user = await User.findOne({ verification_token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      if (!user.verified) {
        user.verified = true;
        await user.save();
      }
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: true, message: "User not found" });
    }
    const resetToken = uuid();
    user.reset_token = resetToken;
    user.reset_token_expiry = Date.now() + 3600000; //1 hour

    await user.save();

    const resetLink = `${process.env.FRONTEND_URI}/reset-password?resetToken=${resetToken}`;

    const emailContent = `
    <p>Click on the link below to reset your password</p>
    <a href=${resetLink}>${resetLink}</a>
    <br>
    <h5>Team Sukoon</h5>
    `;

    sendEmail(email, "Sukoon: Reset your password", emailContent);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch {
    res.status(500).json({ success: false, message: "server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await User.findOne({
      reset_token: resetToken,
      reset_token_expiry: { $gte: Date.now() },
    });

    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
    user.password = bcrypt.hashSync(newPassword, 12);
    user.reset_token = null;
    user.reset_token_expiry = null;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  signUp,
  signIn,
  getUser,
  userProfile,
  professionalProfile,
  verifyUser,
  forgotPassword,
  resetPassword,
};
