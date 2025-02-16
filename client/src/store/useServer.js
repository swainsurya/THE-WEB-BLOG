import { axiosIntance } from "@/lib/axiosInstant";
import {create} from "zustand";

const useServer = create((set) => ({
    created: false,
    protectedUser : false,
    isLoggedIn : false,
    user : {},
    loginCheck : async() =>{
        try {
            const req = await axiosIntance.get("/user/isloggedIn");
            set({isLoggedIn : req.data.success})
        } catch (error) {
            set({isLoggedIn: false})
        }
    },
    setUser : async() => {
        try {
            const req = await axiosIntance.get("/user/user");
            set({user : req.data.user})
        } catch (error) {
        } 
    },
    setLogout : async() => {
        set({user:{}})
    },
    protectLogin : async() => {
        set({protectedUser : true})
    },
    protectLogout : async() => {
        set({protectedUser : false})
    },
    setCreated : async() => {
        set({created : !created})
    }
}))

export default useServer