import express from "express" ;
import "dotenv/config";
import { connectDB } from "./api/lib/connectDB.js";
import cookieParser from "cookie-parser";
import blogRoute from "./api/routes/blog.route.js";
import {clerkMiddleware} from "@clerk/express"

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());


// app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)
app.use(clerkMiddleware());

app.get("/",(req,res) => {
    res.send("Server ready") ;
})

app.listen(port, ()=>console.log("Running Fine!")) ;
