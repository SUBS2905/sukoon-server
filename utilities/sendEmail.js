const dotenv = require("dotenv");
dotenv.config();

const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sender = {
  email: process.env.SIB_EMAIL,
  name: "Subhranshu @ Sukoon"
}

const sendEmail = async(email, subject, text)=>{
  const receivers = [{
    email: email
  }]

  try{
    const send= await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      htmlContent: text
    })

    console.log("messageId: " + send.messageId);
  }catch(err){
    console.log(err);
  }
}


// const nodemailer = require("nodemailer");

// const sendEmail = async (email, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "SendinBlue",
//       auth: {
//         user: process.env.SIB_EMAIL,
//         pass: process.env.SIB_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.SIB_EMAIL,
//       to: email,
//       subject: subject,
//       html: text,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("Error:", error);
//       } else {
//         console.log("Email sent:", info.response);
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = sendEmail;
