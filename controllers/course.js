const Course = require("../models/course");
const User = require("../models/user");
const Tag = require("../models/tags");
const { uploadImageToCloudinary } = require("../utils/cloudiary");
require("dotenv").config();

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

    const userId = req.user.id;
    const instructorDetails = await User.findById({ userId });

    if (!instructorDetails) {
      return res.status(401).json({
        success: false,
        message: "Instructor details not found ",
      });
    }

    //   check given tag is valid or not

    const tagdetails = await Tag.find({ tags });

    if (!tagdetails) {
      return res.status(401).json({
        success: false,
        message: "Tag not found ",
      });
    }

    //  Upload file  to the cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
    );

    // create an entry of the course

    const newCourse = await Course.create({
      coursename,
      coursecontent,
      instructor: instructorDetails._id,
      whatWillYouLearn: whatWillYouLearn,
      price,
      tag: tagdetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // return res.status(200).json({
    //     successs:true,
    //     message:"Course created succesfully"
    // })

    // add the new course ti the user schema  of instructor

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      }
    );

    // update the tag ka schema  -hw

    return res.status(200).json({
      success: true,
      message: "Course created succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong please try again later",
    });
  }
};

// get all courses handler


exports.showAllCourses=async(req,res)=>{
    try{

        const allcourses=await Course.find({
            coursename,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingandreview:true,
            StudentEnrolled:true,
        }).populate("instructor");

    }catch(error){
        console.log(error);
        return res,status(500).json({
            success:false,
            message:"Cannot Fetch Data form the user",
            error:error.message,
        })
    }
}