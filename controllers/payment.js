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
    // user already pay for the same id :- user id in the user schema is present in the form of object id and the request com

    const uid=new mongoose.Types.Object.Id(userid);
    if(course.StudentEnrolled.includes(uid)){
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
    const amount=course.price;
    const currency="INR"

    // return response.status(200).json({

    // })

    const option={

        amount: amount*100,
        currency,
        recipt : Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userid,

        }

    };

    try{
        // initiate the payment using razorpay 
        const paymentresponse=await instance.order.create(option);
        console.log(paymentresponse);

        return res.status(200).json({
            success:true,
      coursename:course.coursename,
      coursedescription:course.thumbnail,
      orderId:paymentresponse.id,
      currency:paymentresponse.currency,
      amount:paymentresponse.amount

        })
    }
    catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:"could not initiate order"
        });
    }
    

    // return response 



}

// verify signature

exports.verifySignature=async (req,res)=>{
   const webhooksceret="1234567";

   const signature=req.headers["x-razorpay-signature"];
   const shasum=crypto.createHamc("sha256",webhooksceret);

   shasum.update(JSON.stringify(req.body));

   const digest=shasum.digest("hex");

   if(signature === digest){
    console.log("payment is autrhorized");

    const {courseid,userid}=req.body.payload.entity.notes;
    








   }
}
