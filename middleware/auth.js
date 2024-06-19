const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth midleware

exports.auth = async (req, res, next)=>{

    try {

        const token = req.cookies.token || req.body.cookies || req.header("Authorization").replace("Bearer ", "");

        // if token is already exist 

        if (!token) {
            return res.status(401).json({
                sucess: true,
                message: "Token is missing"
            });
        }

        // verify token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode; //used to authorize for isstudent ands for isadmin

        } catch (error) {
            // issue in verification 
            return res.status(400).json(
                {
                    success: false,
                    message: "Token is Invalid"
                }
            )
        }
        next();


    } catch (error) {

        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong while generating Token"
        });

    }

}

// Isstudent middleware


exports.Istudent = async (req, res, next){
    try {

        // authorize the user 
        if (req.user.accountType !== "Student") {
            return res.status(401).json(P{
                success: false,
                message: "This is the protected route for the Student "
            });
        }
        next();


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User role cannot be verified please try again later"
        })

    }

}


// Instructor -Instructor

exports.IsAdmin = async (req, res, next){
    try {

        // authorize the user 
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for the Instructor "
            });
        }
        next();


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User role cannot be verified please try again later"
        })

    }

}


// Admin
exports.IsInstructor = async (req, res, next){
    try {

        // authorize the user 
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for the Admin "
            });
        }
        next();


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User role cannot be verified please try again later"
        })

    }

}

