import express from "express";
import "dotenv/config";
import { connectDB } from "./api/lib/connectDB.js";
import cookieParser from "cookie-parser";
import blogRoute from "./api/routes/blog.route.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Debugging Middleware
app.use((req, res, next) => {
    console.log("Middleware reached:", req.originalUrl);
    next();
});

// Clerk Middleware (Before CORS)
app.use(clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,  
    authorizedParties: ["https://the-web-blog.onrender.com"],
}));

// CORS Middleware
app.use(cors({
    origin: ["http://localhost:3000", "https://the-web-blog.onrender.com"], 
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/blog", blogRoute);

app.use((req, res, next) => {
    if (req.originalUrl.includes("redirect")) {
        return res.status(400).json({ message: "Redirect detected!" });
    }
    next();
});


app.get("/", (req, res) => {
    res.send("Server ready");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Middleware Error:", err);
    res.status(500).json({ message: "Middleware Error", error: err.message });
});

app.listen(port, () => console.log("Running Fine!"));
