const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

   
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    comment : {type : String},
    questiontype: {
        type: String,
        enum: ['thankyou', 'suggestion', 'question', 'complaint'],
        default: 'thankyou'
    },
    topic: {
        type: String,
        enum: ['general', 'vehicle', 'service', 'website','other'],
        default: 'general'
    }
},
{timestamps : true}
)
const requestModel = mongoose.model('requests', requestSchema)

module.exports = requestModel