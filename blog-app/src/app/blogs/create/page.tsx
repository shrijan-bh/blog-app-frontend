"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { blogValidationSchema } from "../../../utils/validationSchemas";
import { createBlog, fileUpload } from "../../../utils/blogService";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";

export default function CreateBlog() {
  const { user } = useAuth(); // Get current authenticated user
  const router = useRouter();
  const [error, setError] = useState("");

  const handleFileChange = async (event, setFieldValue) => {
    try {
      const file = event.target.files[0]; 
      console.log(file, "Selected file");
      if (file) {
        const response = await fileUpload(file); 
        if (response && response.result) {
          setFieldValue("blogImage", response.result);
          console.log("File uploaded successfully, URL:", response.result);
        } else {
          setError("Failed to upload image. No URL received.");
        }
      }
    } catch (err) {
      console.error("Error during file upload:", err);
      setError("Error uploading file");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Create Blog</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <Formik
          initialValues={{
           
            featured: false,
          }}
          validationSchema={blogValidationSchema}
          onSubmit={async (values) => {
            try {
              await createBlog(values);
              router.push("/blogs/list");
            } catch (err) {
              setError("Failed to create blog");
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <Field
                  as="textarea"
                  name="content"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows={5}
                />
                <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tag</label>
                <Field
                  type="text"
                  name="tag"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="tag" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Blog Image</label>
                <input
                  type="file"
                  name="blogImage"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
                <ErrorMessage name="blogImage" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4 flex items-center">
                <Field type="checkbox" name="featured" className="h-4 w-4 text-indigo-600" />
                <label className="ml-2 text-sm text-gray-700">Featured</label>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Blog
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
