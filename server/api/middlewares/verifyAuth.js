const verifyAuth = async(req , res , next) => {
    if(!req.auth.userId) {
        return res.status(400).json({
            message : "Unathorized user please login",
            success : false
        })
    }
    next()
}

export {verifyAuth}