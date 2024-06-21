const subsection = require("../models/subsection");
const section = require("../models/section");
const Course = require("../models/course");

exports.Section = async (req, res) => {
  try {
    const { sectionname, courseId } = req.body;

    // data validation
    if (!sectionname || !courseId) {
      return res.status(401).json({
        success: false,
        message: "Enter all the fields carefully",
      });
    }

    // create section
    const newSection = await section.create({
      sectionname,
    });

    // update course with section object id
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          coursecontent: newSection._id,
        },
      },
      {
        new: true,
      }
    ).populate("coursecontent");

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      details: updatedCourseDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

// UpdateHandler

exports.Updatesection = async (req, res) => {
  try {
    //   fetch data from the req body
    const { sectionname, sectionId } = req.body;

    // data validation
    if (!sectionname || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "all the fields are required",
      });
    }

    // now update the data in the db
    const section = await section.findByIdAndUpdate(
      sectionId,
      { sectionname },
      { new: true }
    );

    // return res

    return res.status(200).json({
      success: true,
      message: "section is successfully UPdated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong try againj later",
    });
  }
};

// delete section handler


exports.deleteSection = async (req, res) => {

    // getid-assumingh that we are sending id in paramas

    try {
      // Fetch section ID from the request parameters
      const { sectionId } = req.params;
  
      // Data validation
      if (!sectionId) {
        return res.status(400).json({
          success: false,
          message: "Section ID is required",
        });
      }
  
      // Find and delete the section 
    //   Do we ned to delete the sectionid form the course schema ?? 

      const deletedSection = await section.findByIdAndDelete(sectionId);
  
      // Check if the section was found and deleted
      if (!deletedSection) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        });
      }
  
      // Return response
      return res.status(200).json({
        success: true,
        message: "Section successfully deleted",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Try again later.",
      });
    }
  };
