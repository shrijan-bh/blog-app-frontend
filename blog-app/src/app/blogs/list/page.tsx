"use client";
import { useState, useEffect } from "react";
import { fetchBlogs } from "../../../utils/blogService";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";
import { BlogData } from "@/types/blog";

const BlogList = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<BlogData[]>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBlogs();
        setBlogs(response.data);
      } catch (error) {
        setError("Failed to load blogs. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Blog List</h1>
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs ? (
          blogs.map((blog) => (
            <Link key={blog._id} href={`/blogs/${blog._id}`} passHref>
              <div
                className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mt-2">{blog.content.slice(0, 150)}...</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-500">{blog.tag}</p>
                  <p className="text-sm text-gray-500">
                    {blog.featured ? (
                      <span className="text-green-500 font-semibold">Featured</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Not Featured</span>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
