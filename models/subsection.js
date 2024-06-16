const mongoose=require("mongoose");

const SubsectionSchema=new mongoose.Schema({

    title:{
        type:String

    },
    timeDuration:{
        typr:String
    },
    description:{
        type:String
    },
    VideoUrl:{
        type:String
    }

});

module.exports=mongoose.model("Subsection",SubsectionSchema);