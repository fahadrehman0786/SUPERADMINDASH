const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");

const registerMail = (req, res) => {
  console.log("in register mail", req.body);
  const { email, subject, messages } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: email,
      intro: messages || "Response to your query!",

      outro: "Response to your query.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: subject || "Response regarding query from uCRAFT",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.status(500).json({ error });
    });
};

module.exports = {
  registerMail,
};