const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    require: true,
    trim: true,
  },
  instructor:   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  whatWillYouLearn: {
    type: String,
    require: true,
  },
  coursecontent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      require: true,
    },
  ],
  ratingandreview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndreview",
      require: true,
    },
  ],
  price: {
    type: String,
    require: true,
  },

  thumbnail:{
    type:String
  },

  tagscateogry:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:"tagscateogry"
  }],
  StudentEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  }],


});

module.exports=mongoose.model("Course",courseSchema);