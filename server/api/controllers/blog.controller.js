import { blogModel } from "../models/blog.model.js";

export const createBlog = async (req, res) => {
    const { title, description , img } = req.body;
    const owner = req.user;
    try {
        const newBlog = new blogModel({ ownerId: owner, title, description , img })
        await newBlog.save();
        res.status(200).json({
            message: "Blog created successfully",
            status: true,
            newBlog
        })
    } catch (error) {
        res.status(404).json({
            message: "Internal server error",
            status: false
        })
    }
}

export const getAllOwnBlog = async (req, res) => {
    const owner = req.user;
    try {
        const allBlogs = await blogModel.find({ ownerId: owner }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Your all blogs are",
            status: true,
            allBlogs
        })
    } catch (error) {
        res.status(400).json({
            message: "Internal server error",
            status: false
        })
    }
}

export const getAllBlogs = async (req, res) => {
    const alls = await blogModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
        message: "All Blogs are",
        status: true,
        alls
    })
}

export const getByid = async(req , res) => {
    const {id} = req.params ;
    const blog = await blogModel.findById(id)
    if(!blog){
        return res.json({
            message: "Blog id did'nt match"
        })
    }
    res.json({
        blog
    })
}

export const delOne = async (req, res) => {
    const { id } = req.params;
    try {
        await blogModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Blog deleted successfully",
            status: true
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal Server error",
            status: false,
            error
        })
    }
}

export const delAll = async (req, res) => {
    const owner = req.user
    try {
        await blogModel.deleteMany({ ownerId: owner });
        res.status(200).json({
            message: "Blog Deleted successfully",
            status: true
        })
    } catch (error) {
        res.status(400).json({
            message: "Internal server error",
            status: false
        })
    }
}

export const delAllAdmin = async (req, res) => {
    await blogModel.deleteMany({})
    res.status(200).json({
        message: "All blogs are deleted",
        success: true
    })
}

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description , img } = req.body;
    const updatedBlog = await blogModel.findByIdAndUpdate(id, { title, description , img }, { new: true })
    res.status(200).json({
        message: "Blog updated Success",
        success: true,
        updatedBlog
    })
}

export const likePlus = async (req, res) => {
    const { id } = req.params;
    const likedUser = req.user;
    try {
        const blog = await blogModel.findById(id);

        const check = blog.likes.indexOf(likedUser)

        if (check > -1) {
            return res.status(404).json({
                message: "Already Liked by You"
            })
        }
        else{
            blog.likes.push(likedUser);
        await blog.save();
        res.json({
            message: "Liked Successfully",
            success: true,
            blog
        })
        }
    } catch (error) {

    }
}