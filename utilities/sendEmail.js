const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: process.env.SIB_EMAIL,
        pass: process.env.SIB_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SIB_EMAIL,
      to: email,
      subject: subject,
      // text: text,
      html: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendEmail;
