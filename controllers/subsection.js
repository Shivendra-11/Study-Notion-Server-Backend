const subsection = require("../models/subsection");
const section = require("../models/section");

exports.subsection = async (req, res) => {
  try {
    //   data festch from the request body

    const { title, description,  sectionId } = req.body;

    // validation of all the field
    if (!title || !description || !videourl || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }

    // if all the field are entered

    // create entry in the db
    const subsectioninfo = await subsection.create({
      title,
      description,
      videourl,
    });

    const updatedsubsection = await section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subsection: subsectioninfo._id,
        },
      },
      { new: true }
    );

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
