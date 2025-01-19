// src/app/(blogs)/[id]/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchBlogById, deleteBlog } from "../../../utils/blogService"; // Import deleteBlog
import { Blog } from "../../../types/blog";

const BlogDetailPage = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getBlog = async () => {
      if (id) {
        const data = await fetchBlogById(id as string);
        setBlog(data);
      }
    };
    getBlog();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await deleteBlog(id as string); 
      router.push("/blogs/list"); 
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>{blog.tag}</p>
      <p>{blog.featured ? "Featured" : "Not Featured"}</p>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 mt-4"
      >
        Delete Blog
      </button>
    </div>
  );
};

export default BlogDetailPage;
