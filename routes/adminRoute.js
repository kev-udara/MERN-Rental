const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Admin = require("../models/adminModel")

router.post("/login", async(req, res) =>{
    const {username, password} = req.body

    try{
        const admin = await Admin.findOne({username, password})
        if(admin){
            res.send(admin)
        }
        else{
            return res.status(400).json(error);
        }
    }catch(error){
        return res.status(400).json(error);
    }

});


router.post("/send-coupon", async (req, res) => {
  const { email, coupon } = req.body;
  const couponStr = coupon.toString().trim();
  const couponWithoutCommas = couponStr.replace(/,/g, "");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kevinsamarasinghe2001@gmail.com",
      pass: "yromxdcykfztwgce",
    },
  });


  const mailOptions = {
    from: "EZ-Auto <ez-auto@example.com>",
    to: email,
    subject: "Discount Coupon",
    html: `
    <div style="background-color: black; color: white; padding: 20px; border-radius: 15px">
    <img src="https://lh3.googleusercontent.com/p/AF1QipMgkVPRrlMxadokpqrrDycdpk_pCLBhUGzQ880G=w1080-h608-p-no-v0" alt="EZ-Auto Logo" style="display: block; margin: 0 auto; max-width: 200px;">
    <p>Congratulations, you have received a discount coupon.</p>
    <p>Your discount code : ${couponWithoutCommas}</p>
    <p>Feel free to use this code to save 30% off your in-store rentals from EZ-Auto.</a></p>
  </div>
  `
  };

  transporter.sendMail(mailOptions,  (error, info) =>{
    if (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});



module.exports = router