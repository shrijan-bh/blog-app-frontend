import apiClient from "./apiClient";
import {  BlogResponse } from "../types/blog";

// Fetch all blogs
export const fetchBlogs = async (): Promise<BlogResponse> => {
  const response = await apiClient.get("/blogs");
  return response.data;
};

// Create a blog
export const createBlog = async (blogData: {
  title: string;
  content: string;
  tag: string;
  featured: boolean;
  blogImage: string; // This is the image URL
}) => {
  const response = await apiClient.post("/blogs/create", blogData);
  return response.data;
};


// Fetch a single blog by its ID
export const fetchBlogById = async (id: string) => {
  const response = await apiClient.get(`/blogs/${id}`);
  return response.data;
};

// Delete a blog
export const deleteBlog = async (id: string) => {
  const response = await apiClient.delete(`/blogs/${id}`);
  return response.data;
};

export const fileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file); // Attach the file to the "file" key

  const response = await apiClient.post("/files/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

