const mongoose = require("mongoose");

const bookingaccessorySchema = new mongoose.Schema({

    accessory : {type : mongoose.Schema.Types.ObjectId, ref: 'accessories'},
    user : {type : mongoose.Schema.Types.ObjectId, ref: 'users'},
    bookedTimeSlots : {
        from : {type : String},
        to : {type : String}
    },
    totalHours : {type : Number},
    totalAmount : {type : Number},
    transactionId : {type : String},
    status: {
        type: String,
        enum: ['orderplaced', 'orderconfirmed', 'outfordelivery', 'complete'],
        default: 'orderplaced'
    }
},
{timestamps : true}
)
const bookingaccessoryModel = mongoose.model('accessorybookings', bookingaccessorySchema)

module.exports = bookingaccessoryModel