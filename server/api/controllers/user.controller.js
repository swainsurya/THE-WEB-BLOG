import { userModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"

export const register = async(req , res) => {
    const {username , email , password} = req.body ;
    try {
        const userExist = await userModel.findOne({email}) ;
        if(userExist) {
            return res.status(404).json({
                message : 'User Already Exists, Login Please',
                success : false
            })
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const user = new userModel({username , email , password : hashPassword}) ;
        await user.save();
        res.status(200).json({
            message : "User registered",
            success : true,
            user
        })
    } catch (error) {
        return res.status(404).json({message : "Internal server error"}) ;
    }
}

export const login = async(req, res) => {
    const {email , password} = req.body
    try {
        const isUser = await userModel.findOne({email});
        if(!isUser) {
            return res.status(404).json({
                message : "User not found",
                success : false
            })
        }
        const comparePassword = await bcryptjs.compare(password, isUser.password) ;
        if(!comparePassword) {
            return res.status(404).json({
                message : "Password not match",
                success : false
            })
        }

        // store cookie in res 
        const token = jwt.sign({userId : isUser._id },process.env.JWT_KEY,{expiresIn : '3d'}) ;
        res.cookie("token" , token,{
            httpOnly: true,
            secure: false, // Change to `true` if using HTTPS
            sameSite: "lax",
            maxAge : 24*60*60*1000,  // valid for 24 hr
        })

        res.status(200).json({
            message : "User login success",
            success : true,
            isUser,
            token
        })
    } catch (error) {
        return res.status(404).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

export const logout = async(req, res) => {
    await res.clearCookie("token");
    res.status(200).json({
        message : 'Logout Success',
        status : true
    })
}

export const isLoggedin = async(req , res) => {
    res.json({
        success : true
    })
}

export const getUser = async(req,res) => {
    const userid = req.user ;
    try {
        const user = await userModel.findById(userid) ;
        res.json({
            user
        })
    } catch (error) {
        res.json({
            message : "Unathorized User"
        })        
    }
}
