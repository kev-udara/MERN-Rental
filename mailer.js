const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kevinsamarasinghe2001@gmail.com',
    pass: 'yromxdcykfztwgce'
  }
});

const sendWelcomeEmail = (email, username) => {
  const mailOptions = {
    from: 'EZ-Auto <ez-auto@example.com>',
    to: email,
    subject: 'Welcome to our site!',
    html: `
    <div style="background-color: black; color: white; padding: 20px; border-radius: 15px">
    <img src="https://lh3.googleusercontent.com/p/AF1QipMgkVPRrlMxadokpqrrDycdpk_pCLBhUGzQ880G=w1080-h608-p-no-v0" alt="EZ-Auto Logo" style="display: block; margin: 0 auto; max-width: 200px;">
    <p>Hello ${username},</p><p>Welcome to our site!</p><p>Click <a href="http://localhost:3000/login">here</a> to log in.</p>
    </div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendRequestFormEmail = (email, name) => {
  const mailOptions = {
    from: 'EZ-Auto <ez-auto@example.com>',
    to: email,
    subject: 'Request Form received!',
    html: `
              <div style="background-color: black; color: white; padding: 20px; border-radius: 15px">
              <img src="https://lh3.googleusercontent.com/p/AF1QipMgkVPRrlMxadokpqrrDycdpk_pCLBhUGzQ880G=w1080-h608-p-no-v0" alt="EZ-Auto Logo" style="display: block; margin: 0 auto; max-width: 200px;">
              <p>Hello ${name},</p><p>Your request form has been received</p><p>Thank you for your feedback, have a nice day.</p>
              </div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendResponseEmail = (email, responseText) => {
  const mailOptions = {
    from: 'EZ-Auto <ez-auto@example.com>',
    to: email,
    subject: 'Response to Your Request',
    html: `
      <div style="background-color: black; color: white; padding: 20px; border-radius: 15px">
        <img src="https://lh3.googleusercontent.com/p/AF1QipMgkVPRrlMxadokpqrrDycdpk_pCLBhUGzQ880G=w1080-h608-p-no-v0" alt="EZ-Auto Logo" style="display: block; margin: 0 auto; max-width: 200px;">
        <p>Hello,</p>
        <p>Thank you for your request. Here is our response:</p>
        <p>${responseText}</p>
        <p>Best regards,</p>
        <p>EZ-Auto Team</p>
      </div>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendWelcomeEmail};

module.exports = { sendRequestFormEmail};

module.exports = { sendResponseEmail };