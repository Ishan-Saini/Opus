const nodemailer = require('nodemailer');

const sendEmail = async (config) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailConfig = {
    from: 'Opus Admin <opus@gmail.com>',
    to: config.email,
    subject: config.subject,
    text: config.message,
  };

  await transporter.sendMail(mailConfig);
};

module.exports = sendEmail;
