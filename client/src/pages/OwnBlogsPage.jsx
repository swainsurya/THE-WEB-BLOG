import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { axiosIntance } from '@/lib/axiosInstant';
import Navbar from '@/components/Navbar';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const OwnBlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const {uid} = useParams();
    useEffect(() => {
        fetchBlogs();
    }, [blogs]);

    const fetchBlogs = async () => {
        try {
            const response = await axiosIntance.post('/blog/getown',{userId : uid});
            setBlogs(response.data.allBlogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const deleteBlog = async (id) => {
        if(confirm("Are you sure?")) {
            try {
                await axiosIntance.delete(`/blog/del/${id}`);
                // setBlogs(blogs.filter(blog => blog.id !== id));
                toast.success("Blog Deleted")
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const removeAllBlogs = async () => {
        if(confirm("Are you sure?")) {
            try {
                await axiosIntance.delete('/blog/del');
                toast.success("All blogs are deleted");
            } catch (error) {
                toast.error("Internal Server error");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 min-h-screen transition-colors -z-10 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
                <h1 className="text-4xl font-bold mb-8 text-center animate-fade-in">My Blogs</h1>
                {blogs.length === 0 ? (
                    <p className="text-center text-lg animate-pulse">No blogs found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="relative p-4 border rounded-lg shadow-lg transition-all bg-gradient-to-r from-pink-500 to-purple-500 dark:from-gray-800 dark:to-gray-900 hover:shadow-2xl transform hover:scale-105 duration-300 animate-fade-in">
                                {blog.image && (
                                    <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-110" />
                                )}
                                <h2 className="text-xl font-semibold text-white animate-slide-in">{blog.title}</h2>
                                <p className="mt-2 text-gray-200 animate-fade-in">{blog.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-all transform hover:scale-110">👍 {blog.likes.length}</Button>
                                    <div className="flex gap-2">
                                        <Button onClick={() => deleteBlog(blog._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all transform hover:scale-110">Delete</Button>
                                        <Link to={`/edit/${blog._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-all transform hover:scale-110">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex justify-center mt-10">
                    <Button onClick={removeAllBlogs} className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow text-lg transition-all transform hover:scale-110 animate-bounce">Remove All</Button>
                </div>
            </div>
        </>
    );
};

export default OwnBlogPage;
