const profile = require("../models/profile");
const Profile = require("../models/profile");
const User = require("../models/user");

exports.updateProfile = async (req, res) => {
  try {
    // get user deatils
    const { gender, dateofbirth = "", about = "", contactNumber } = req.body;

    // get user id
    const id = req.user.id;

    // validtion
    if (!contactNumber || !gender || !id) {
      return res.status(401).json({
        success: false,
        message: "All the field are required",
      });
    }
    // find profile

    const userdetails = await User.findById(id);
    const profileId = userdetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // update profile  to the Db

    profileDetails.dateofbirth = dateofbirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    // return response

    res.status(200).json({
      success: true,
      message: "Profile updated succesfully ",
      profiledtatis: profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong while creating profile ",
      error: error.message,
    });
  }
};





// Deleteaccount
exports.deleteAccount=async(req,res)=>{
    try{
        // get id

        const id=req.user.id;

        // validation 

        if(!id){
            return res.status(401).json({
success:false,
message:"id not found "
            })
        }



        // find the id and delete user profile
        await Profile.findByIdAndDelete({_id:userdetails.additionalDetails});


        // by using id and delete the user form the db 
await User.findByIdAndDelete({_id:id});

        // return response 
        return res.status(200).json({
            success:true,
            message:"User Deleted succesfully"
        });



    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong cant delete the id "
    })

    }
}

// how can we schedule the requewst

// cron job

// HW

// getalluserdetails

