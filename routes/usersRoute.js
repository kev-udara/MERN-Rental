const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { sendWelcomeEmail } = require('../mailer');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
  

router.post("/login", async(req, res) =>{
    const {username, password} = req.body

    try{
        const user = await User.findOne({username, password})
        if(user){
            res.send(user)
        }
        else{
            return res.status(400).json(error);
        }
    }catch(error){
        return res.status(400).json(error);
    }

});

router.post("/register", async(req, res) =>{

    try{
        const newuser = new User(req.body)
        await newuser.save()

           // Send welcome email
           sendWelcomeEmail(newuser.email, newuser.username); // Send welcome email to new user

        res.send('User registered successfully')
    }catch(error){
        return res.status(400).json(error);
    }

});

// @route   POST api/users/forgot-password
// @desc    Send password reset email
// @access  Public
router.post(
    '/forgot-password',
    [
      check('email', 'Please enter a valid email').isEmail(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findOne({ email: req.body.email });
  
        if (!user) {
          return res.status(400).json({ msg: 'User not found' });
        }
  
        // Generate a unique token with crypto
        const resetToken = crypto.randomBytes(20).toString('hex');
  
        // Set token and expiration in the database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiration = Date.now() + 3600000; // 1 hour
        await user.save();
  
        // Send password reset email
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'kevinsamarasinghe2001@gmail.com',
            pass: 'yromxdcykfztwgce'
          }
        });
  
        const mailOptions = {
          from: 'EZ-Auto <ez-auto@example.com>',
          to: user.email,
          subject: 'Password Reset Request',
          html: `
            <div style="background-color: black; color: white; padding: 20px; border-radius: 15px">
              <img src="https://lh3.googleusercontent.com/p/AF1QipMgkVPRrlMxadokpqrrDycdpk_pCLBhUGzQ880G=w1080-h608-p-no-v0" alt="EZ-Auto Logo" style="display: block; margin: 0 auto; max-width: 200px;">
              <p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
              <p>Please click on the following link, or paste this into your browser to complete the process:</p>
              <p><a href="https://mern-rental.herokuapp.com/reset-password/${resetToken}" style="color: white;">https://mern-rental.herokuapp.com/reset-password/${resetToken}</a></p>
              <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            </div>
          `
        };
        
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
  
        res.send('Password reset email sent' );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

  router.post('/reset-password/:resetToken', async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { resetToken } = req.params;
    console.log(req.body)
  
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    try {
      // Find user by reset token
      const user = await User.findOne({ resetPasswordToken: resetToken });
  
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if reset token is still valid
      if (user.resetPasswordExpiration.getTime() < new Date().getTime()) {
        return res.status(400).json({ error: 'Password reset link has expired' });
      }
  
      // Update user's password and remove reset token
      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordExpiration = null;
      await user.save();
      // Redirect user to login page with success message
      //window.location.href='/login';
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get("/getallusers",async(req, res)=>{

    try{
        const users = await User.find()
        res.send(users)
    }catch(error){
        return res.status(400).json(error);
    }
});
  
  
  
  
  
  


module.exports = router;
