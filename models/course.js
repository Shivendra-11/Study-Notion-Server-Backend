const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    require: true,
    trim: true,
  },
  instructor: {
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

  tags:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:"tags"
  }],
  StudentEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  }],


});

module.exports=mongoose.model("Course",courseSchema);