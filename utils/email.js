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

// const nodemailer = require("nodemailer");
// const pug = require("pug");
// const htmlToText = require("html-to-text");

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(" ")[0];
//     this.url = url;
//     this.form = `Siddhartha Raut <${process.env.EMAIL_FORM}>`;
//   }
//   newTransport() {
//     if (process.env.NODE_ENV === "production") {
//       return 1;
//     }
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       Port: process.env.EMAIL_PORT, //!port ko p capital huna parxa

//       auth: {
//         user: process.env.EMAIL_USERNAMES,
//         pass: process.env.EMAIL_PASSWORDS,
//       },
//     });
//   }

//   async send(template, subject) {
//     //Render HTML based on a pug template
//     const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//       firstName: this.firstName,
//       url: this.url,
//       subject,
//     });

//     //Define email options
//     const mailOptions = {
//       from: "Siddhartha Raut <sidedunp@gmail.com>",
//       to: options.email,
//       subject: options.subject,
//       subject,
//       html,
//       text: htmlToText.fromString(html),
//     };

//     //Create a transport and send email
//     await this.newTransport();
//   }

//   async sendEmail() {
//     await this.send("welcome", "Welcome to the App");
//   }
// };

// const sendEmail = async (options) => {
//   //!Create a transporter

//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     Port: process.env.EMAIL_PORT, //!port ko p capital huna parxa

//     auth: {
//       user: process.env.EMAIL_USERNAMES,
//       pass: process.env.EMAIL_PASSWORDS,
//     },
//   });
//   //!Define the email option

//   const mailOptions = {
//     from: this.form,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html
//   };

//   //!Actually send the email
//   await transporter.sendMail(mailOptions);
// };
// module.exports = sendEmail;

const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Email Everyday <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === "production") {
    //   // Sendgrid
    //   return nodemailer.createTransport({
    //     service: "SendGrid",
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_PASSWORD,
    //     },
    //   });
    // }
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      Port: process.env.EMAIL_PORT, //!port ko p capital huna parxa

      auth: {
        user: process.env.EMAIL_USERNAMES,
        pass: process.env.EMAIL_PASSWORDS,
      },
      // });
      // return nodemailer.createTransport({
      // service: "gmail",
      // auth: {
      // user: process.env.EMAIL_USERNAME,
      // pass: process.env.EMAIL_PASSWORD,
      // user: "everydayemail305@gmail.com",
      // pass: "kuat pzrh uknh ueku",
      // },
    });
  }
  // Send the actual email
  async send(template, subject, quoteText) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      quoteText,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to Email Everyday");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Here is your token.Token is valid for only 10 min"
    );
  }
  // async sendEmail() {
  //   await this.send("sendEmail", "Email for today 🎉🙏");
  // }

  async sendEmail(quoteText) {
    await this.send("sendEmail", "Email for today 🎉🙏", quoteText);
  }
};
