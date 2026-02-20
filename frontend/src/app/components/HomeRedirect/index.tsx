"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../AuthProvider";
import Login from "../loginForm";

export default function HomeRedirect() {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
    // If you want to show login here, remove the redirect and just render <Login />
  }, [token, router]);

  return <Login />;
}