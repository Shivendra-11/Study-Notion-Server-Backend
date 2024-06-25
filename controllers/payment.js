const {instance}=require("../config/razorpay");
const Course=require("../models/course");
const User=require("../models/user");
const mailsender=require("../utils/mailsender");
// also import course enrolement 


exports.capturePayment=async(req,res)=>{
    // fetch all the course and the user id 

    const {course_id}=req.body;

    const userid=req.user.id;



    // validation 
    if(!course_id ){
        return res.json({
            success:false,
            message:"Please  provide valid course ID"
        })
    }

    // valid coursedetails

    let course;
    try{
        course=await Course.findById(course_id);

if(!course){
    return res.status(401).json({
            success:false,
             message:"Could not find the course related to id "

    });
    // user already pay for the same id :-

    const uid=new mongoose.Types.Object.Id(userid);
    if(course.studentsEnrolled.includes(uid)){
        return res.status(401).json({
            success:false,
            message:"User already enrolled"
        })
    }

}
    }catch(error){
    console.error(error);
        return res.status(200).json({
            message:error.message,
            success:false
        })
    }



    // order create

    // return response 

}
