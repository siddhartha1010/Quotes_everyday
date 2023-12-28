// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   //   host: "smtp.forwardemail.net",
//   //   port: 465,
//   service: "Gmail",
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //!Create a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    Port: process.env.EMAIL_PORT, //!port ko p capital huna parxa

    auth: {
      user: process.env.EMAIL_USERNAMES,
      pass: process.env.EMAIL_PASSWORDS,
    },
  });
  //!Define the email option

  const mailOptions = {
    from: "Siddhartha Raut <sidedunp@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  //!Actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
