import { useState, useEffect } from "react";
import { fetchBlogs } from "../../../utils/blogService";
import { Blog } from "../../../types/blog";
import Link from "next/link";

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} className="border-b pb-4 mb-4">
            <Link href={`/blogs/${blog._id}`}>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
            </Link>
            <p className="text-gray-700">{blog.content.slice(0, 150)}...</p>
            <p className="text-sm text-gray-500">{blog.tag}</p>
            <p className="text-sm text-gray-500">
              {blog.featured ? "Featured" : "Not Featured"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
