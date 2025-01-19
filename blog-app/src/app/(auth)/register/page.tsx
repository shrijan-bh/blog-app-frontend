// src/app/(auth)/register/page.tsx
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import * as Yup from "yup";

const Register = () => {
  const { handleRegister } = useAuth();
  const [error, setError] = useState<string>("");

  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
    phoneNumber: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    try {
      await handleRegister(values.fullName, values.email, values.password, values.phoneNumber);
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          phoneNumber: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label>Full Name</label>
              <Field type="text" name="fullName" />
              <ErrorMessage name="fullName" component="div" />
            </div>
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
            <div>
              <label>Phone Number</label>
              <Field type="text" name="phoneNumber" />
              <ErrorMessage name="phoneNumber" component="div" />
            </div>
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
