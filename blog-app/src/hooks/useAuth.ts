import { useState, useEffect } from "react";
import { login, register } from "../utils/authService";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "@/utils/cookies";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();


  useEffect(() => {
    const token = getCookie("authToken");
    if (token) {
      setUser({ token });  // Set user state based on token
    }
  }, []);
  

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      setUser(data.user); 
      setCookie("authToken", data.token, 7);  // Store token in cookies
      router.push("/blogs/list");  // Redirect to the list page after successful login
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleRegister = async (fullName: string, email: string, password: string, phoneNumber: string) => {
    try {
      const data = await register(fullName, email, password, phoneNumber);
      router.push("/login");
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  const handleLogout = () => {
    deleteCookie("authToken");  // Clear token from cookies
    setUser(null);  // Clear user state
    router.push("/login");  // Redirect to login page after logout
  };
  

  return { user, handleLogin, handleRegister, handleLogout };
};
