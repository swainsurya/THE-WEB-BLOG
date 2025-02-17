import axios from "axios";

export const axiosIntance =  axios.create({
    baseURL:import.meta.env.VITE_SERVER,
    withCredentials : true,
    maxRedirects : 0,
    headers : {
        "Content-Type" : "application/json"
    },
}) ;
