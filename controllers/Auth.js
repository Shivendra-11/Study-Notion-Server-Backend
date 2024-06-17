const User = require("../models/user");
const OTP = require("../models/otp");
const otpGenrator = require("otp-genrator");

// Function to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Send OTP
exports.SendOtp = async (req, res) => {
  try {
    // Fetch email from the request body
    const { email } = req.body;

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check if user is already registered
    const isUserRegistered = await User.findOne({ email });

    if (isUserRegistered) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // Generate unique OTP
    var otp = otpGenrator.genrate(6, {
      upperCaseAlphabet: false,
      lowerCaseAlphabet: false,
      specialChars: false, // Corrected spelling
    });

    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenrator.genrate(6, {
        upperCaseAlphabet: false,
        lowerCaseAlphabet: false,
        specialChars: false, // Corrected spelling
      });

      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };

    // Create entry in the DB for the email and unique OTP
    const otpBody = await OTP.create(otpPayload);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      body: otpBody,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in generating OTP",
      details: error.message, // Corrected error message access
    });
  }
};
