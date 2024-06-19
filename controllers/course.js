const Course = require("../models/course");
const User = require("../models/user");
const Tag = require("../models/tags");
const { uploadImageToCloudinary } = require("../utils/cloudiary");

exports.createCourses = async (req, res) => {
  try {
    // fetch data
    const {
      coursename,
      courseDescription,
      whatWillYouLearn,
      coursecontent,
      price,
      tags,
    } = req.body;
    // get thumbnail
    const thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !coursename ||
      !courseDescription ||
      !coursecontent ||
      !price ||
      !tags
    ) {
      return res.status(401).json({
        success: false,
        message: "All filed are required",
        message: error.message,
      });
    }

    // check for instructor




    
  } catch (error) {}
};

// get all courses handler
