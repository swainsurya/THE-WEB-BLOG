import axios from "axios";

export const axiosIntance =  axios.create({
    baseURL:"https://e8bdbdc5-5e6f-4f41-ab4a-268a11811a56-00-2c6bj053q7qnc.sisko.replit.dev/api",
    withCredentials : true,
    headers : {
        "Content-Type" : "application/json"
    },
}) ;
