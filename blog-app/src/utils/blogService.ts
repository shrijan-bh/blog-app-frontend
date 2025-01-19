import apiClient from "./apiClient";
import { Blog } from "../types/blog";

export const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await apiClient.get("/blogs");
  return response.data; 
};

export const createBlog = async (blogData: {
  title: string;
  content: string;
  tag: string;
  featured: boolean;
  blogImage: string;
}) => {
  const response = await apiClient.post("/blogs/create", blogData);
  return response.data;
};

export const fetchBlogById = async (id: string) => {
  const response = await apiClient.get(`/blogs/${id}`);
  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await apiClient.delete(`/blogs/${id}`); 
  return response.data;
};
