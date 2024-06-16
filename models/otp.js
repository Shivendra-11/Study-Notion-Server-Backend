const mongoose = require("mongoose");

const otpSchema = new mongoose.schema({
  email: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  otp: {
    type: String,
    default: Date.now(),
    expires: 5 * 60,
  },
});


// pre model to send the otp to the user after that it save entry to the db 








module.exports = mongoose.model("otp", otpSchema);
