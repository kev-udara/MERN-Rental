const express = require("express");
const router = express.Router();
const Report = require("../models/reportModel");

router.post("/submit", async(req, res) =>{

    try{
        const newReport = new Report(req.body)
        await newReport.save();

        res.send('Report submitted successfully')
    }catch(error){
        return res.status(400).json(error);
    }

});

router.get("/getallreports", async (req, res) => {
    try {
      const reports = await Report.find()
      .populate("car")
      res.send(reports);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  router.get("/getalladminreports", async (req, res) => {
    try {
      const reports = await Report.find()
        .populate("car")
        .populate("user")
      res.send(reports);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

    router.put('/:id/status', async (req, res) => {
      try {
        const report = await Report.findById(req.params.id);
        report.status = req.body.status;
        await report.save();
        res.json(report);
      } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong, please try later');
      }
    });

  module.exports = router;