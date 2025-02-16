import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Eye, Bookmark, ThumbsUp, ArrowRightCircle } from "lucide-react";
import { axiosIntance } from "@/lib/axiosInstant";
import { SkeletonBox } from "./SkeletonBox";
import useServer from "@/store/useServer";
import toast from "react-hot-toast";

// const blogs = [
//   { id: 1, title: "The Future of AI", description: "How AI is shaping our future.", image: "https://source.unsplash.com/300x200/?technology,ai" },
//   { id: 2, title: "Web3 Revolution", description: "Decentralized web explained.", image: "https://source.unsplash.com/300x200/?blockchain,crypto" },
//   { id: 3, title: "React vs Vue", description: "Which frontend framework is better?", image: "https://source.unsplash.com/300x200/?javascript,react" },
//   { id: 4, title: "The Rise of Tailwind", description: "Why TailwindCSS is taking over.", image: "https://source.unsplash.com/300x200/?css,design" },
//   { id: 5, title: "Next.js Performance", description: "Why Next.js is great for SEO.", image: "https://source.unsplash.com/300x200/?coding,nextjs" },
//   { id: 6, title: "Building APIs with Node.js", description: "Guide to building robust APIs.", image: "https://source.unsplash.com/300x200/?nodejs,backend" },
//   { id: 7, title: "UI/UX Trends in 2025", description: "What’s next in UI design?", image: "https://source.unsplash.com/300x200/?design,ux" },
//   { id: 8, title: "Machine Learning Basics", description: "Understanding ML models.", image: "https://source.unsplash.com/300x200/?machinelearning,ai" },
//   { id: 9, title: "Data Science for Beginners", description: "Starting with data science.", image: "https://source.unsplash.com/300x200/?data,analytics" },
//   { id: 10, title: "Cybersecurity in 2025", description: "How to stay secure online.", image: "https://source.unsplash.com/300x200/?security,hacking" },
// ];



export default function HeroSection() {

  const [blogs, setBlogs] = useState([]);
  const [load, setLoad] = useState(true);
  const { page } = useParams();

  useEffect(() => {
    localStorage.setItem("loading", "hero");
    const getAllBlogs = async () => {
      try {
        const allBlogs = await axiosIntance.get("/blog/allblogs");
        if(!page) setBlogs(allBlogs.data.alls.slice(0, 10));
        else setBlogs(allBlogs.data.alls.slice(10*(page-1), 10*page));
      } catch (error) {

      }
      finally {
        setLoad(false);
      }
    }
    getAllBlogs();
    if(page == undefined) return;
  }, [blogs])

  const handleLike = async (id) => {
    try {
      const req = await axiosIntance.post(`/blog/like/${id}`)
      toast.success(req.data.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <section className="py-10 px-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Explore Latest Blogs 🚀
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          load ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <SkeletonBox key={i} />
            ))
          ) : (
            blogs.map((blog) => (
              <Card key={blog._id} className="shadow-lg bg-white dark:bg-gray-800">
                <img src={blog.img} alt={blog.title} className="w-full h-60 object-cover rounded-t-lg" />
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{blog.title}</h2>
                  <p className="text-black/70">{blog.createdAt.split("T")[0]}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/blog/${blog._id}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      Read More
                    </Link>
                    <div className="flex space-x-3">
                      <Button variant="ghost" size="icon">
                        <Eye size={18} />
                      </Button>
                      <Button onClick={e => handleLike(blog._id)} variant="ghost" size="icon">
                        <ThumbsUp size={18} />
                        {blog.likes.length}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )
        }
      </div>
      <div className="my-6 w-full flex items-center justify-center">
        <Link to={`/${2}`} className="flex items-center justify-center gap-2 text-blue-600 font-bold hover:text-blue-700">
          <span>NEXT</span>
          <ArrowRightCircle />
        </Link>
      </div>
    </section>
  );
}
