const mongoose=require("mongoose");

const SectionSchema=new mongoose.Schema({

    sectionname:{
        type:String

    },
   subsection:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:"Subsection",
    required:true

   }]

});

module.exports=mongoose.model("Section",SectionSchema);