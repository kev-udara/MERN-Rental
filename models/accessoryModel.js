const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
    name:{type: String, required:true},
    image:{type: String, required:true},
    description:{type: String, required:true},
    bookedTimeSlots:[
        {
            from:{type: String, required:true},
            to:{type: String, required:true}
        }
    ],
    rentPerHour : {type : Number, required : true}
},{timestamps:true}
)
const accessoryModel = mongoose.model('accessories', accessorySchema)
module.exports = accessoryModel