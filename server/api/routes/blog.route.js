import { Router } from "express";
import { verifyAuth} from "../middlewares/verifyAuth.js";
import { createBlog, delAll, delAllAdmin, delOne, getAllBlogs, getAllOwnBlog, getByid, likePlus, updateBlog } from "../controllers/blog.controller.js";
import { requireAuth } from "@clerk/express";


const blogRoute = Router();

// Not Auth User
blogRoute.get("/allblogs", getAllBlogs) ;
blogRoute.get("/:id",getByid);
blogRoute.get("/",(req,res) => {
    res.json({
        message : "Blog get method" 
    })
})

blogRoute.use(requireAuth());

// Authenticated User
blogRoute.post("/create",verifyAuth, createBlog) ;
blogRoute.post("/getown",verifyAuth, getAllOwnBlog) ;
blogRoute.delete("/del/:id", verifyAuth,delOne) ;
blogRoute.delete("/del",verifyAuth,delAll)
blogRoute.put("/update/:id",verifyAuth,updateBlog);
blogRoute.post("/like/:id",verifyAuth,likePlus) ;

// admin can do all



export default blogRoute ;