const Profile=require("../models/profile");
const User=require("../models/user");

exports.updateProfile=async(req,res)=>{
    try{

        // get user deatils 
        const {gender,dateofbirth="",about="",contactNumber}=req.body;


        // get user id 
const id=req.user.id;


        // validtion 
if(!contactNumber || !gender || !id ){
    return res.status(401).json({
        success:false,
        message:"All the field are required"
         
    });
}
        // find profile 

        const userdetails=await User.findById(id);
        const profileId=userdetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);


        // update profile 
        profileDetails.dateofbirth=dateofbirth;
         profileDetails.about=about;
         profileDetails.gender=gender;
         profileDetails.contactNumber=contactNumber;
        //  profileDetails.about=about;

        await profileDetails.save();

    
        // return response 


        res.status(200).json({
            success:true,
            message:"Profile updated succexfully ".
            profiledtatis:profileDetails
         

        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while creating profile ",
            error:error.message
        });

    }
}