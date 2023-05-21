const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect('mongodb+srv://kev_udara:Eagle123@cluster0.im0dmce.mongodb.net/mern-ezauto',{useUnifiedTopology:true, useNewUrlParser:true})
    const connection = mongoose.connection
    connection.on('connected', ()=>{
        console.log('Mongo DB Connection Successfull')
    })
    connection.on('error',()=>{
        console.log('Mongo DB Connection Error')

    })
}

connectDB()
module.exports = mongoose