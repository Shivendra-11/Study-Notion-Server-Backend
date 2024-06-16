require('dotenv').config();
const mongoose=require('mongoose');

exports.dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        console.log("Database connected");
    }).catch((error)=>
    {
        console.log("Error in connecting to database",error);
        process.exit(1);
    })
}



