// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { login, register } from "../utils/authService";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "@/utils/cookies";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("authToken");
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      setUser(data.user);
      router.push("/blogs/list"); 
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleRegister = async (fullName: string, email: string, password: string, phoneNumber: string) => {
    try {
      const data = await register(fullName, email, password, phoneNumber);
      setUser(data.user);
      router.push("/blogs/list");   
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  const handleLogout = () => {
    deleteCookie("authToken");
    setUser(null);
    router.push("/login");
  };

  return { user, handleLogin, handleRegister, handleLogout };
};
