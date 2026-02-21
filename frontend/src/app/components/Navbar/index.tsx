// navbar with just the logout button
"use client";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import LogoutButton from "../LogoutButton";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">Chat App</div>
      <LogoutButton />
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span className="text-gray-300">{user.username}</span>
          </>
        )}
      </div>
    </nav>
  );
}