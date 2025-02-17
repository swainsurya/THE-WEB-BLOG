import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { axiosIntance } from "@/lib/axiosInstant";
import { SkeletonBox } from "@/components/SkeletonBox";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [load, setLoad] = useState(true);

  const [newBlogs , setNewBlogs] = useState([])

  useEffect(() => {
    const getBlog = async () => {
      try {
        const req = await axiosIntance.get(`/blog/${id}`);
        setBlog(req.data.blog);
        // new blogs 
        const allBlogs = await axiosIntance.get("/blog/allblogs");
        const threeBlogs = allBlogs.data.alls.splice(0,3);
        setNewBlogs(threeBlogs) ;
      } catch (error) {

      }
      finally {
        setLoad(false)
      }
    }
    getBlog();
  }, [id])

  return (
    <div className="min-h-screen p-6">

      {/* Blog Content */}
      <Card className="max-w-3xl mx-auto  shadow-lg p-6">
        {
          load ? (
            <SkeletonBox />
          ) : (
            <>
              <img src={blog.img} alt={blog.title} className="w-full h-1/2 object-cover rounded-xl" />
              <CardContent className="mt-4">
                <h1 className="text-2xl font-bold">{blog.title}</h1>
                <p className="text-gray-600 mt-2">{blog.description}</p>
              </CardContent>
            </>
          )
        }
      </Card>

      {/* Similar Content Suggestions */}
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">New Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newBlogs.map((item) => (
            <Card key={item._id} className="shadow-md">
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover rounded-t-lg" />
              <CardContent className="p-4">
                <h3 className="text-md font-semibold">{item.title}</h3>
                <Button asChild variant="outline" className="mt-2 w-full">
                  <Link to={`/blog/${item._id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
