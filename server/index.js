import express from "express" ;
import "dotenv/config";
import { connectDB } from "./api/lib/connectDB.js";
import cookieParser from "cookie-parser";
import userRoute from "./api/routes/user.route.js";
import blogRoute from "./api/routes/blog.route.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(cors(
    {
        origin: "https://the-web-blog-frontend.onrender.com", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS", // Allow all methods
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
  credentials: true, // Allow cookies and authentication headers
    }
))

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)

app.get("/",(req,res) => {
    res.send("Server ready") ;
})

app.listen(port, ()=>console.log("Running Fine!")) ;
