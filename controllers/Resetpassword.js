const User = require("../models/user");
const mailSender = require("../utils/mailsender");

// Flow of whole proces

// get email from the body of request
// check user for this email email validation
// genrate token
// update user by adding token and expiration time
// create url
// return response


// resetpasword token

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Your Email is not registered with us ",
      });
    }

    // Genrate token
    const token = crypto.randomUUID();

    // update user by adding token and expiration time  ...

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    // send email constaing the url

    await mailSender(email, "password Reset Link", `password reset : ${url}`);

    return res.status(200).json({
      success: true,
      message:"Email sent succesfully please check the emailand change password  ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "sonething went wrong ",
    });
  }
};

// Reset password

exports.resetpassword = async (req, res) => {
  try {
    // data fetch
    const { password, confirmpassword, token } = req.body;

    // here token is entered from the frontend in the body of request

    // validation
    if (password !== confirmpassword) {
      return res.json({
        success: false,
        message: "Password not matching ",
      });
    }

    // get user detail  from the token of the user genrated above and update the password of the user in the db

    const userdetails = await User.findOne({ token: token }); 

    // if entry not found -send response (Invalid token or time expires)
    if (!userdetails) {
      return res.json({
        success: true,
        message: "Token is Inavalid ",
      });
    }

    // check time of the token
    if (userdetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Toke is expired please regenrate your token ",
      });
      // hashed the new password
      const hashedpassword = await bcrypt.hash(password, 10);
    }

    // now at the end update the password  and retun the  response

    await User.findOneAndUpdate(
      {
        token: token,
      },
      {
        passowrd: hashedpassword,
      },
      {
        new: true,
      }
    );

    return res.json({
        success:true,
        message:"Password reset succesfully"
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"SOmething went wrong"

    })
  }
};
