const User = require("../models/user");
const OTP = require("../models/otp");
const otpGenrator = require("otp-genrator");
const Profile=require("../models/profile");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

// Function to validate email format


// Send OTP
exports.SendOtp = async (req, res) => {
  try {
    // Fetch email from the request body
    const { email } = req.body;
  
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


// Signup Handler

const validateEmail = (Email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
exports.Signup = async (req, res) => {
  try {
    // Fetch all the data from the request body
    const { Fname, Lname, Email, Password, accountType, confirmpassword, otp, contactnumber } = req.body;

    if (!validateEmail(Email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate all the input fields
    if (!Fname || !Lname || !Email || !Password || !confirmpassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if passwords match
    if (Password !== confirmpassword) {
      return res.status(401).json({
        success: false,
        message: "Passwords do not match. Please enter the correct password.",
      });
    }

    // Check if user is already registered
    const isRegisteredUser = await User.findOne({ Email });
    if (isRegisteredUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }
    // check the most recent otp forn the same email

     const recentotp=await OTP.find({Email}).sort({createdAt:-1}).limit(1);

    //  validate OTP

    if(recentotp.length==0){
      return res.sattus(401).json({
        success:false,
        messafge:"OTP not found"
      });
    }else if(otp !== recentotp.otp ){
      // Invalid otp
      return res.status(400).json({
        success:false,
        messge:"Invalid OTP"
      })

    }

    // Hashpassword using Bcrypt

    const hashedpassword=await bcrypt.hash(Password,10);

    // create profile for the user
    const profileDetils=await Profile.Create({
      gender:null,
      dateOfBirth:null,
      about:null,
      constactNumber:null,

    })
    

    // If all validations pass, proceed with creating the user
    const newUser = new User({
      Fname,
      Lname,
      Email,
      Password:hashedpassword,
      accountType,
      otp,
      contactnumber,
      additionalDetails:profileDetils._id,
      image:""

    });

    const newuserbody= await User.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data:newuserbody,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error user cannot be registered",
    });
  }
};
 

// Login handler

exports.login = async (req, res) => {
  try {
    // get data from req body 
    const { Email, Password } = req.body;

    // Validate data
    if (!Email || !Password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required. Please enter carefully."
      });
    }
    
    // Check for user existence
    const user = await User.findOne({ Email }).populate("additionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist."
      });
    }

    // Generate JWT after password matching 
    if (await bcrypt.compare(Password, user.Password)) {
      const payload = {
        email: user.Email,
        id: user._id,
        role: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h"
      });

      user.token = token;
      user.Password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully."
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password not matched or incorrect."
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during the login process."
    });
  }
};


// change password

exports.changepassword=async (req,res){
  // get data form the user body 
  // get oldpassword new password confirmpassword
  // validation
  // update password in the db 
  // send email-passwrod changes succesfully
  // return response 

}