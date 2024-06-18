const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({


    Fname: {
        type: String,
        required: true,
        trim: true
    },
    Lname: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
    },
    Password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Instructor"],
    },
    token:{
        type:String,

    },
    resetPasswordExpires:{
         type:Date,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required: true,

    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],

    image:{
        type:String,
        required:String,
    },
    courseprogress:[{
        type:mongoose.Schema.Types.Objectid,
        ref:"CourseProgress"
    }]


});

module.exports=mongoose.model("User",userSchema);
