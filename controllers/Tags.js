const Tags = require("../models/tags");

// create handler for tag function
exports.createtag = async (req, res) => {
  try {
    // fetch data from the request body
    const { name, description } = req.body;

    // validate
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create entry in db
    const tagDetails = await Tags.create({
      name: name,
      description: description,
    });

    return res.status(201).json({
      success: true,
      message: "Tag created successfully",
      tagDetails: tagDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the tag",
      details: error.message,
    });
  }
};

// get all tags
exports.showAlltags = async (req, res) => {
  try {
    const allTags = await Tags.find({});
    return res.status(200).json({
      success: true,
      message: "Fetched all tags successfully",
      tags: allTags,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the tags",
      details: error.message,
    });
  }
};
