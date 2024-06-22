const mongoose = require("mngoose");

const profileschema = new mongoose.Schema({
  gender: {
    type: String,

  },
  dateofbirth: {
    type: String,

  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: String,

  },
});

module.exports=mongoose.model("Profile",profileschema);

