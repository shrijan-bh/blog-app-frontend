import apiClient from "./apiClient";
import { getCookie, setCookie } from "./cookies";

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/users/login", { email, password });
    const { token } = response.data;
    setCookie("authToken", token, 7); // Token will expire in 7 days
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const register = async (fullName: string, email: string, password: string, phoneNumber: string) => {
  try {
    const response = await apiClient.post("/users/register", {
      fullName,
      email,
      password,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const isAuthenticated = (): boolean => {
  const token = getCookie("authToken");
  return !!token; 
};