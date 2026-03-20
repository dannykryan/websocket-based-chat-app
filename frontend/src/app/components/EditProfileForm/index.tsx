"use client";
import { useState } from "react";
import Button from "../Button";
import AvatarUpload from "../AvatarUpload";
import { User } from "../../types/user";
import FormInput from "../FormInput";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type EditProfileFormProps = {
  initialValues: {
    username: string;
    email: string | undefined;
    bio?: string | null;
    profilePictureUrl?: string | null;
  };
  onCancel: () => void;
  onSaved: (updatedUser: User) => void;
};

export default function EditProfileForm({ initialValues, onCancel, onSaved }: EditProfileFormProps) {
  const [username, setUsername] = useState(initialValues.username);
  const [email, setEmail] = useState(initialValues.email);
  const [bio, setBio] = useState(initialValues.bio ?? "");
  const [profilePictureUrl, setProfilePictureUrl] = useState(initialValues.profilePictureUrl ?? "");
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token") ?? undefined;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email, bio, profilePictureUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to update profile");
      onSaved(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Avatar upload */}
      <AvatarUpload
        value={profilePictureUrl}
        onChange={setProfilePictureUrl}
        token={token}
      />

      {/* Username */}
      <FormInput
        label="Username"
        type="text"
        value={username}
        autoComplete="username"
        onChange={setUsername}
        required
      />

      {/* Email */}
      <FormInput
        label="Email"
        type="email"
        value={email ?? ""}
        autoComplete="email"
        onChange={setEmail}
        required
      />

      {/* Bio */}
      <FormInput
        label="Bio"
        type="text"
        value={bio}
        onChange={setBio}
      />

      <div className="flex gap-2 justify-end pt-2">
        <Button btnStyle="gray" onClick={onCancel}>Cancel</Button>
        <Button btnStyle="primary" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}