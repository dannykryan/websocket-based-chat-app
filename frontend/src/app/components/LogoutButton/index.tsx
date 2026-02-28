"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../AuthProvider";
import { logoutUser } from "../../utils/auth";
import Button from "../Button";

const LogoutButton = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser(setUser, setToken, router);
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
