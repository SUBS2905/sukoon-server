const User = require("../models/user");
const sendEmail = require("../utilities/sendEmail");

const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await User.find({ isProfessional: true }).select(
      "professional"
    );
    res.status(200).json(professionals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getDetails = async (req, res) => {
  const professionalId = req.params.id;
  try {
    const professional = await User.findOne({
      "professional._id": professionalId,
    }).select("professional");

    if (!professional) {
      res.status(404).json({ message: "Professional not found" });
    }
    res.status(200).json(professional);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const notify = async (req, res) => {
  const professionalId = req.params.id;
  try {
    const authHeader = await req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Auth Header missing" });
    }
    const token = authHeader.split(" ")[1];
    const clientInfo = await User.findOne({ user_token: token });

    if (!clientInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    const professionalInfo = await User.findOne({"professional._id": professionalId});

    if (!professionalInfo) {
      return res.status(404).json({ message: "Professional not found" });
    }

    const email = professionalInfo.email;
    const subject = `New Client Request: ${clientInfo.profile.firstname}`;
    const content = `
      <strong>Dear ${professionalInfo.username},</strong><br>
      <p>You have received a new client request. Here are the details:</p>
      <p>Name: <strong>${clientInfo.profile.firstname} ${clientInfo.profile.lastname}</strong></p>
      <p>Email: <strong>${clientInfo.email}</strong></p>
      <p>Contact No. : <strong>${clientInfo.profile.phone}</strong></p>
      <p>Please <a href="${process.env.FRONTEND_URI}/login" target="_blank">log in</a> to your account for more information</p>
      <p>Thank you for using Sukoon</p>
      <br>
      <strong>Best Regards,</strong><br>
      <strong>Team Sukoon</strong>
    `;

    sendEmail(email, subject, content);
    res.status(200).json({ message: "email sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllProfessionals, getDetails, notify };
