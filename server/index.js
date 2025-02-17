import express from "express" ;
import "dotenv/config";
import { connectDB } from "./api/lib/connectDB.js";
import cookieParser from "cookie-parser";
import blogRoute from "./api/routes/blog.route.js";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express"

const app = express();
const port = process.env.PORT ;
connectDB();

app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET" , "POST" , "DELETE" , "PUT"],
    credentials : true
}))

app.use(express.json());
app.use(cookieParser());


// app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)
app.use(clerkMiddleware());

app.get("/",(req,res) => {
    res.send("Server ready") ;
})

app.listen(port, ()=>console.log("Running Fine!")) ;