const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "pranimales22@gmail.com",
    pass: "sfmjiayihzjhgatx",
  },
  tls: { rejectUnauthorized: false },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: "pranimales22@gmail.com",
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendLinkResetPassword = (name, email, link) => {
  console.log("Check link Reset Password");
  transport
    .sendMail({
      from: "pranimales22@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `<h1>A request for a new password has been requested</h1>
        <h2>Hello ${name}</h2>
        <p>We received a request to change your password a few moments ago, if it wasn't you, please ignore this message</p>
        <a href="${link}" > Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
