import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { axiosIntance } from "@/lib/axiosInstant";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        if(!form.email || !form.password) {
            toast.error("Please Fill The Form")
            setLoading(false);
            return ;
        }
        try {
            const response = await axiosIntance.post("/user/login", { email: form.email, password: form.password });
            navigate("/");
            localStorage.setItem("protected","true") ;
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false);
        }
    }
    
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!form.email || !form.password || !form.name) {
            toast.error("Please Fill The Form")
            setLoading(false);
            return ;
        }
        try {
            const response = await axiosIntance.post("/user/register", { username: form.name, email: form.email, password: form.password });
            navigate("/login")
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-screen flex ">
            {/* Side Hero Section */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex-col justify-center items-center p-10">
                <h2 className="text-4xl font-bold">Welcome to THE WEB BLOG</h2>
                <p className="mt-2 text-lg text-center max-w-md">
                    The ultimate platform to explore and share knowledge.
                </p>
            </div>

            {/* Auth Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
                <Card className="w-full max-w-md shadow-lg">
                    <CardContent>
                        <Tabs defaultValue="login">
                            <TabsList className="w-full flex justify-center mb-4">
                                <TabsTrigger value="login" className="w-1/2">Login</TabsTrigger>
                                <TabsTrigger value="register" className="w-1/2">Register</TabsTrigger>
                            </TabsList>

                            {/* Login Form */}
                            <TabsContent value="login">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <Button type="submit" className="w-full">
                                        {
                                            isLoading ? (<Loader className="animate-spin" />) : "Login"
                                        }
                                    </Button>
                                </form>
                            </TabsContent>

                            {/* Register Form */}
                            <TabsContent value="register">
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <Button type="submit" className="w-full">
                                        {
                                            isLoading ? (<Loader className="animate-spin" />) : "Register"
                                        }
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
