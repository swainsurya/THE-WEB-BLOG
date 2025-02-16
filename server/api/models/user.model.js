import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type : String},
    email : {type : String , required : String},
    password : {type : String , required : String},
}, {timestamps : true}
)

export const userModel = mongoose.model("user",userSchema) ;