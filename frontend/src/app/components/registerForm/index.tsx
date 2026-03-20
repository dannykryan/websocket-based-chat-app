"use client";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useRouter } from "next/navigation";
import Button from "../Button";
import AvatarUpload from "../AvatarUpload";
import FormInput from "../FormInput";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, profilePictureUrl }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please log in.");
        router.push("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Network error: " + err.message);
      } else {
        setError("Network error");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-woodsmoke border border-gray-700 rounded-xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold mb-4 text-white">Register</h2>
      <AvatarUpload
        value={profilePictureUrl}
        onChange={setProfilePictureUrl}
        type="register"
      />
      <FormInput
        label="Username"
        type="text"
        value={username}
        autoComplete="username"
        onChange={setUsername}
        required
      />
      <FormInput
        label="Email"
        type="email"
        value={email ?? ""}
        autoComplete="email"
        onChange={setEmail}
        required
      />
      <FormInput
        label="Password"
        type="password"
        value={password ?? ""}
        autoComplete="current-password"
        onChange={setPassword}
        required
      />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <Button
        type="submit"
        btnStyle="primary"
        className="w-full"
      >
        Register
      </Button>
    </form>
  );
};

export default Register;
