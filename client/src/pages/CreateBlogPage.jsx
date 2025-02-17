import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { axiosIntance } from "@/lib/axiosInstant";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

export default function BlogCreator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [load, setLoad] = useState(false);

  // for edit 
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  const {user} = useClerk() ;

  const handlePreview = () => {
    setShowPreview(true);
  };

  const getBlogForEdit = async() => {
    const req = await axiosIntance.get(`/blog/${id}`)
    const res = req.data.blog ;
    setTitle(res.title);
    setDescription(res.description);
    setImageUrl(res.img);
  }

  useEffect(() => {
    if (!id) setIsEdit(false);
    else{
      setIsEdit(true)
      getBlogForEdit()
    }
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const req = await axiosIntance.post("/blog/create", {
        title,
        description,
        img: imageUrl,
        ownerId : user.id
      })
      console.log(req)
      toast.success(req.data.message)
    } catch (error) {
      toast.error("Sever error")
    }
    finally {
      setLoad(false);
    }
  };

  const handleEdit = async() => {
    setLoad(true)
    try {
      const req = await axiosIntance.put(`/blog/update/${id}`,{title, description, img: imageUrl})
      toast.success(req.data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
    finally {
      setLoad(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full h-screen p-6 gap-6 overflow-hidden md:overflow-visible light:bg-white light:text-black dark:bg-gray-900 dark:text-white">
        <div className="w-full md:w-1/2 p-10 rounded-lg shadow-lg border light:bg-white light:border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-center mb-8 light:text-indigo-600 dark:text-indigo-400">
            {isEdit ? "Edit Blog" : "Create a Blog"}
          </h1>
          <form onSubmit={handleCreate} className="space-y-8">
            <Input className="p-4 text-lg border-2 rounded-lg focus:ring-2 w-full" placeholder="Enter Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }} />
            <Textarea className="p-4 text-lg border-2 rounded-lg focus:ring-2 h-40 w-full resize-none overflow-auto" placeholder="Enter Blog Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }} />
            <Input className="p-4 text-lg border-2 rounded-lg focus:ring-2 w-full" placeholder="Enter Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
            <div className="flex gap-6">
              <Button type="button" onClick={handlePreview} className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 text-lg rounded-lg transition-all">Preview</Button>
              {
                isEdit ? (
                  <Button type="button" onClick={handleEdit} className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 text-lg rounded-lg transition-all">
                    {load ? <Loader2 size={16} className="animate-spin" /> : "Save"}
                  </Button>
                ) : (
                  <Button type="submit" className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 text-lg rounded-lg transition-all">
                    {load ? <Loader2 size={16} className="animate-spin" /> : "Create"}
                  </Button>
                )
              }
            </div>
          </form>
        </div>

        {showPreview && (
          <div className="w-full md:w-1/2 p-6 rounded-lg shadow-md overflow-auto max-h-full light:bg-gray-100 light:text-black dark:bg-gray-800 dark:text-white">
            <h1 className="text-2xl font-bold text-center mb-4">Blog Preview</h1>
            <div className="break-words overflow-auto text-ellipsis w-full">
              <h2 className="text-xl font-semibold break-words w-full">{title || "Blog Title"}</h2>
              <p className="mt-2 break-words w-full overflow-auto">{description || "Blog description will appear here..."}</p>
              {imageUrl  && (
                <img src={imageUrl} alt={title} className="mt-4 w-full h-64 object-cover rounded-lg" onError={(e) => e.target.style.display = 'none'} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
