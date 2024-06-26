const { instance } = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/user");
const mailsender = require("../utils/mailsender");
const mongoose = require('mongoose'); // Added mongoose
const crypto = require('crypto'); // Added crypto

// Capture Payment
exports.capturePayment = async (req, res) => {
  const { course_id } = req.body;
  const userid = req.user.id;

  // Validation
  if (!course_id) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid course ID",
    });
  }

  try {
    // Fetch course details
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the user is already enrolled
    const uid = new mongoose.Types.ObjectId(userid);
    if (course.StudentEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "User already enrolled",
      });
    }

    // Create order
    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt: Math.random().toString(), // Fixed receipt generation
      notes: {
        courseId: course_id,
        userid,
      },
    };

    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);

    return res.status(200).json({
      success: true,
      coursename: course.coursename,
      coursedescription: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

// Verify Signature
exports.verifySignature = async (req, res) => {
  const webhookSecret = "1234567";
  const signature = req.headers["x-razorpay-signature"];
  const shasum = crypto.createHmac("sha256", webhookSecret);

  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is authorized");

    const { courseid, userid } = req.body.payload.entity.notes;

    try {
      // Enroll the student in the course
      const enrolledCourse = await Course.findByIdAndUpdate(
        courseid,
        { $push: { StudentEnrolled: userid } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      // Add course to user's enrolled courses
      const enrollStudent = await User.findByIdAndUpdate(
        userid,
        { $push: { courses: courseid } },
        { new: true }
      );

      if (!enrollStudent) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Send enrollment email
      const emailResponse = await mailsender(
        enrollStudent.email,
        "Regarding the course enrollment",
        "Congrats, you have successfully purchased the course"
      );

      return res.status(200).json({
        success: true,
        message: "Signature verified and course added",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};
