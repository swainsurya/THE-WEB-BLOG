import axios from "axios";

export const axiosIntance =  axios.create({
    baseURL:"https://the-web-blog-server.onrender.com/api",
    withCredentials : true,
    headers : {
        "Content-Type" : "application/json"
    },
}) ;
