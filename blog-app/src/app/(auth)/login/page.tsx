// src/app/(auth)/login/page.tsx
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import * as Yup from "yup";

const Login = () => {
  const { handleLogin } = useAuth();
  const [error, setError] = useState<string>("");

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await handleLogin(values.email, values.password);
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
