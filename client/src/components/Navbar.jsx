import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // If using React Router
import { Menu, X, Sun, Moon, Home, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { SignInButton, SignOutButton, SignUpButton, useClerk } from "@clerk/clerk-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // clerk auth

  const { user } = useClerk()

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
              user ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <Button variant="destructive" className="rounded-full text-sm">
                      <span>{user?.username?.substring(0, 1).toUpperCase()}</span>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col items-center justify-center gap-2">
                    <h3>HI {user?.username}</h3>
                    <Link className="w-full" to={"/create"}><Button variant="ghost" className="w-full text-start">Create Blogs</Button></Link>
                    <Link className="w-full" to={`/ownblogs/${user.id}`}><Button variant="ghost" className="w-full">Your Own Blogs</Button></Link>
                    <SignOutButton redirectUrl="/"><Button variant="outline" className="w-full">Logout</Button></SignOutButton>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <>
                  <SignInButton mode="modal"><Button variant="outline">Login</Button></SignInButton>
                  <SignUpButton mode="modal"><Button variant="secondary" className="bg-green-600 hover:bg-green-700">Create New Account</Button></SignUpButton>
                </>
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
              user ? (
                <div>
                  <h3>HI {user.username}</h3>
                  <Link className="w-full"><Button variant="ghost" className="w-full text-start" to={"/create"}>Create Blogs</Button></Link>
                  <Link className="w-full" to={`/ownblogs/${user.id}`}><Button variant="ghost" className="w-full">Your Own Blogs</Button></Link>
                  <SignOutButton redirectUrl="/"><Button variant="outline" className="w-full">Logout</Button></SignOutButton>
                </div>
              ) : (
                <>
                  <SignInButton mode="modal"><Button variant="outline">Login</Button></SignInButton>
                  <SignUpButton mode="modal"><Button variant="secondary" className="bg-green-600 hover:bg-green-700">Create New Account</Button></SignUpButton>
                </>
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
