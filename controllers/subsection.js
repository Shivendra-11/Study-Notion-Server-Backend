const subsection = require("../models/subsection");
const section = require("../models/section");
const { uploadImageToCloudinary } = require("../utils/cloudiary");

require("dotenv").config();
exports.subsection = async (req, res) => {
  try {
    //   data festch from the request body

    const { title, description,  sectionId ,timeDuration  } = req.body;
    // extract file video url

    const videourl=req.files.videoFile;
    
    // validation of all the field
    if (!title || !description || !videourl || !sectionId||!timeDuration) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }

    // if all the field are entered
    const uploadDetails=await uploadImageToCloudinary(videourl,process.env.FOLDER_NAME);

    // create entry in the db
    const subsectioninfo = await subsection.create({
      title:title,
      timeDuration:timeDuration,
      description:description,
      videourl:uploadDetails.secure_url,
    });

    const updatedsubsection = await section.findByIdAndUpdate(
      {_id:sectionId},
      {
        $push: {
          subsection: subsectioninfo._id,
        },
      },
      { new: true }
    ).populate("subsection");

    return res.status(200).json({
        success:true,
        message:"section updated succesfullly",
        data:updatedsubsection
    }).populate("subsection");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Subsection cannot created try again ",
    });
  }
};


// Update subsection 



// Deletesubsection