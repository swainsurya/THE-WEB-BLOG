import express from "express" ;
import "dotenv/config";
import { connectDB } from "./api/lib/connectDB.js";
import cookieParser from "cookie-parser";
import userRoute from "./api/routes/user.route.js";
import blogRoute from "./api/routes/blog.route.js";
import cors from "cors";

const app = express();
const port = process.env.PORT ;
connectDB();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)

app.get("/",(req,res) => {
    res.send("Server ready") ;
})

app.listen(port, ()=>console.log("Running Fine!")) ;