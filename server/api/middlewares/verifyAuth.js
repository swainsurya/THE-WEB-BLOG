import jwt from "jsonwebtoken";

export const verifyAUth = async(req , res , next) => {
    const token = req.cookies.token ;
    if(!token) {
        return res.status(404).json({
            message : "Unathorized User",
            success : false
        })
    }
    const decode = jwt.decode(token, process.env.JWT_KEY);
    req.user = decode.userId ;
    next();
}

export const adminCheck = async(req, res , next) => {
    const {code} = req.body 
    if(code == "7750") {
        next();
    }
}