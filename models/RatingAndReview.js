const mongoose = require("mongoose");

const RatingAndreview = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  rating: {
    type: String,
    require: true,
  },
  review: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("RatingAndreview", RatingAndreview);
