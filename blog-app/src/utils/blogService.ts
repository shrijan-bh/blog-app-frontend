import apiClient from "./apiClient";
import {  BlogResponse } from "../types/blog";

export const fetchBlogs = async (): Promise<BlogResponse> => {
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

export const fileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file); 

  const response = await apiClient.post("/files/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

