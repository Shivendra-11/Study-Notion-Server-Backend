const mongoose = require("mngoose");

const profileschema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    trim: true,
  },
  constactNumber: {
    type: String,
    trim: true,
  },
});

module.exports=mongoose.model("Profile",profileschema);

