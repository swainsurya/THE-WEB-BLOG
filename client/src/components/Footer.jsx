import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Section - Brand & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">THE WEB BLOG</h2>
            <p className="mt-2 text-sm">
              Your go-to platform for the latest blogs on tech, coding, and AI.
            </p>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          </div>

          {/* Right Section - Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-blue-500"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
              <a href="#" className="hover:text-pink-500"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-600"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} thewebblog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
