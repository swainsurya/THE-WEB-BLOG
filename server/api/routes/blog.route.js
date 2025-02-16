import { Router } from "express";
import { adminCheck, verifyAUth } from "../middlewares/verifyAuth.js";
import { createBlog, delAll, delAllAdmin, delOne, getAllBlogs, getAllOwnBlog, getByid, likePlus, updateBlog } from "../controllers/blog.controller.js";

const blogRoute = Router();

blogRoute.get("/",(req,res) => {
    res.json({
        message : "Blog get method" 
    })
})

// Authenticated User
blogRoute.post("/create",verifyAUth , createBlog) ;
blogRoute.get("/get-own",verifyAUth, getAllOwnBlog) ;
blogRoute.delete("/del/:id", verifyAUth,delOne) ;
blogRoute.delete("/del",verifyAUth,delAll)
blogRoute.put("/update/:id",verifyAUth,updateBlog);
blogRoute.post("/like/:id",verifyAUth,likePlus) ;

// admin can do all
blogRoute.delete("/deladmin/:id", adminCheck,delOne) ;
blogRoute.delete("/alldel",adminCheck , delAllAdmin) ;

// Not Auth User
blogRoute.get("/allblogs", getAllBlogs) ;
blogRoute.get("/:id",getByid);

export default blogRoute ;