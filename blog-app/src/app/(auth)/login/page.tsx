"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link"; 
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const Login = () => {
  const { handleLogin } = useAuth();
  const [error, setError] = useState<string>("");
  const router = useRouter(); 

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await handleLogin(values.email, values.password);
      router.push("/blogs/list");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </Form>
          )}
        </Formik>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
