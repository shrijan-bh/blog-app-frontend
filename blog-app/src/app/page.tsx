"use client"; 

import { useState, useEffect } from "react";
import { isAuthenticated } from "@/utils/authService";
import BlogList from "./(blogs)/list/page";
import Login from "./(auth)/login/page";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  if (!authenticated) {
    return <Login />; 
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <BlogList /> 
      </main>
    </div>
  );
}
