import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    ownerId : {type: String , required: true} ,
    title : {type : String, required : true},
    description : {type : String, required : true},
    likes : [],
    img : {type: String, required : true}
}, {timestamps : true}
)

export const blogModel = mongoose.model("blog", blogSchema) ;