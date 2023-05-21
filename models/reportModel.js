const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cars'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  accidentCause: {
    type: String,
    required: true
  },
  accidentLocation: {
    type: String,
    required: true
  },
  accidentDate: {
    type: Date,
    required: true
  },
  accidentTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['orderplaced', 'orderconfirmed', 'outfordelivery', 'complete'],
    default: 'orderplaced'
}
}, {
  timestamps: true
});


const reportModel = mongoose.model('reports', reportSchema)
module.exports = reportModel;
