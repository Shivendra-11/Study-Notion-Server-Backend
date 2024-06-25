const razorpay=require("razorpay");

exports.inatance=new Razorpay({
    Key_id:process.env.RAZORPAY_KEY,
    Key_secret: process.env.RAZORPAY_SECRET,

});

