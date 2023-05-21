const express = require("express");
const router = express.Router();
const Request = require("../models/requestModel");
const { sendResponseEmail } = require('../mailer');


router.post("/submit", async(req, res) =>{

  try{
      const newRequest = new Request(req.body)
      await newRequest.save();
      res.send('Request form submitted successfully')
  }catch(error){
      return res.status(400).json(error);
  }

}); 

router.get("/getalladminrequests", async (req, res) => {
    try {
      const requests = await Request.find()
      res.send(requests);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  router.post("/sendresponse", async (req, res) => {
    try {
      const { requestId, responseText } = req.body;
  
      // Find the request by ID
      const request = await Request.findById(requestId);
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      // Send the response email
      sendResponseEmail(request.email, responseText);

      await Request.findByIdAndRemove(requestId);
  
      res.json({ message: 'Response sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;