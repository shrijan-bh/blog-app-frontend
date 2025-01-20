"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { fetchBlogById, deleteBlog } from "../../../utils/blogService";
import { BlogData } from "../../../types/blog";

const BlogDetailPage = () => {
  const [blog, setBlog] = useState<BlogData | null>(null);
  const router = useRouter();
  const { id } = useParams(); 

  useEffect(() => {
    const getBlog = async () => {
      if (id) {
        const data = await fetchBlogById(id as string);
        setBlog(data.result);
      }
    };
    getBlog();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      try {
        // Calling deleteBlog function from blogService
        await deleteBlog(id as string); 
        router.push("/blogs/list"); // Redirect to the blog list page after deletion
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  if (!blog) return <div className="text-center py-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Displaying Image */}
      {blog.blogImage && (
        <div className="mb-4">
          <img 
            src={blog.blogImage} 
            alt={blog.title} 
            className="w-full h-auto rounded-md shadow-md" 
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 text-lg mb-4">{blog.content}</p>
      <p className="text-sm text-gray-500 mb-2">Tags: {blog.tag}</p>
      <p className="text-sm text-gray-500 mb-6">
        {blog.featured ? "Featured" : "Not Featured"}
      </p>
      <div className="flex justify-between">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Delete Blog
        </button>
        <button
          onClick={() => router.push("/blogs/list")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default BlogDetailPage;
