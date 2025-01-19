"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { blogValidationSchema } from "../../../utils/validationSchemas";
import { createBlog } from "../../../utils/blogService";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";

export default function CreateBlog() {
  const { user } = useAuth(); // Get current authenticated user
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "",
        blogImage: "",
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
      {() => (
        <Form>
          <div>
            <label>Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label>Content</label>
            <Field type="text" name="content" />
            <ErrorMessage name="content" component="div" />
          </div>
          <div>
            <label>Tag</label>
            <Field type="text" name="tag" />
            <ErrorMessage name="tag" component="div" />
          </div>
          <div>
            <label>Blog Image</label>
            <Field type="text" name="blogImage" />
            <ErrorMessage name="blogImage" component="div" />
          </div>
          <div>
            <label>Featured</label>
            <Field type="checkbox" name="featured" />
          </div>
          <button type="submit">Create Blog</button>
        </Form>
      )}
    </Formik>
  );
}
