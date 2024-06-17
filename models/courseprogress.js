const mongoose = require("mongoose");

const courseProgress = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "Course",
  },

  completedVideos: [
    {
      type: mongoose.Schema.type.ObjectId,
      ref: "Subsection",
    },
  ],
});

module.exports = mongoose.model("courseProgress", courseProgress);
