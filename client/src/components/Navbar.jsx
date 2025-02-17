import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // If using React Router
import { Menu, X, Sun, Moon, Home,  InfoIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useServer from "@/store/useServer";
import { axiosIntance } from "@/lib/axiosInstant";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [us, setUs] = useState(null);
  const [login, setLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const {isLoggedIn , loginCheck , setUser, user} = useServer() ;
  console.log(isLoggedIn);
  const handleLogout = async() => {
    await axiosIntance.post("/user/logout") ;
    localStorage.removeItem("protected");
    toast.success("Logout Success") ;
    loginCheck();
  }

  useEffect(()=>{
    loginCheck();
    setUser();
  },[user])

 useEffect(()=>{
    const fetchLogin = async() => {
      try {
        const req = await fetch("https://the-web-blog-server.onrender.com/user/isloggedIn"); 
        setLogin(true);
      } catch (error) {
        setLogin(false);
      }
    }
  },[])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            THE WEB BLOG
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 flex flex-row items-center gap-2">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 flex flex-row items-center gap-2">
              <InfoIcon size={18} />
              <span>About</span>
            </Link>

            {/* User  */}

            {
              login ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="destructive" className="rounded-full text-sm">
                      <span>{user?.username?.substring(0,1)}</span>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col items-center justify-center gap-2">
                    <h3>HI {user?.username}</h3> 
                    <Link className="w-full" to={"/create"}><Button variant="ghost" className="w-full text-start">Create Blogs</Button></Link>
                    <Link className="w-full" to={"/ownblogs"}><Button variant="ghost" className="w-full">Your Own Blogs</Button></Link>
                    <Button onClick={handleLogout} variant="outline" className="w-full">Logout</Button>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <Link to={"/login"}><Button variant="outline">Login</Button></Link>
              )
            }

            {/* Dark Mode Toggle */}
            <button
              className="text-gray-700 dark:text-gray-200 ml-4"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">
              About
            </Link>
            {
              isLoggedIn == "true" ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="destructive" className="rounded-full text-sm">
                      <UserIcon size={21} />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col items-center justify-center gap-2">
                    <Link className="w-full"><Button variant="ghost" className="w-full text-start">Create Blogs</Button></Link>
                    <Link className="w-full"><Button variant="ghost" className="w-full">Your Own Blogs</Button></Link>
                    <Button onClick={handleLogout} variant="outline" className="w-full">Logout</Button>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <Link to={"/login"}><Button variant="outline">Login</Button></Link>
              )
            }

            {/* Dark Mode Toggle */}
            <button
              className="text-gray-700 dark:text-gray-200"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
