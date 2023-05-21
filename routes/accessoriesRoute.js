const express = require("express");
const router = express.Router();
const Accessory = require("../models/accessoryModel")

router.get("/getallaccessories",async(req, res)=>{

    try{
        const accessories = await Accessory.find()
        res.send(accessories)
    }catch(error){
        return res.status(400).json(error);
    }
});

router.post("/addaccessory",async(req,res)=>{
try {
    const newaccessory = new Accessory(req.body)
    await newaccessory.save()
    res.send('Accessory added successfully')
} catch (error) {
    return res.status(400).json(error);
}
});

router.post("/editaccessory",async(req,res)=>{
    try {
        const accessory = await Accessory.findOne({_id : req.body._id})
        accessory.name = req.body.name
        accessory.image = req.body.image
        accessory.description = req.body.description
        accessory.rentPerHour = req.body.rentPerHour
        await accessory.save()
        res.send('Accessory details updated successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
    });

        router.post("/deleteaccessory",async(req,res)=>{
        try {
             await Accessory.findOneAndDelete({_id : req.body.accessoryid})
            
            res.send('Accessory deleted successfully')
        } catch (error) {
            return res.status(400).json(error);
        }
        });


module.exports = router;