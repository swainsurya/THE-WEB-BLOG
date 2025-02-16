import { Router } from "express";
import { getUser, isLoggedin, login, logout, register } from "../controllers/user.controller.js";
import { verifyAUth } from "../middlewares/verifyAuth.js";

const userRoute = Router();

userRoute.get("/",verifyAUth,(req,res) => {
    res.json({
        message : "User get method"
    })
})

userRoute.post("/login" ,login)
userRoute.post("/register", register)
userRoute.get("/isloggedIn", verifyAUth, isLoggedin)
userRoute.post("/logout",logout)
userRoute.get("/user",verifyAUth , getUser)

export default userRoute ;