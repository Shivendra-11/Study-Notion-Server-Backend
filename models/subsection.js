const mongoose = require("mongoose");

const SubsectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  timeDuration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  VideoUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Subsection", SubsectionSchema);
