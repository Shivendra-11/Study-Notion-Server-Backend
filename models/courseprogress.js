const mongoose=require("mongoose");

const courseProgress=mongoose.Schema({

    courseId:{
        type:mongoose.Schema.Type.ObjectId,
        ref:"Courses"


    },

    completedVideos:[{
        type:mongoose.Schema.type.ObjectId,
        ref:"SubSection"
    }]


    
});

module.exports=mongoose.model("courseProgress",courseProgress);