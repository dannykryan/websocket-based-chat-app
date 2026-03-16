"use client";
import { use, useContext } from "react";
import { useEffect, useState } from "react";
import { User } from "../../types/user";
import ProfileFriendshipBar from "../../components/ProfileFriendshipBar";
import { AuthContext } from "../../components/AuthProvider";
import ProfileSkeleton from "../../components/ProfileSkeleton";
import Avatar from "../../components/Avatar";

export default function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { user: authUser } = useContext(AuthContext);
  const { username } = use(params);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(null);
  }, [username]);

  useEffect(() => {
    if (!username) return;
    fetch(`http://localhost:4000/api/user/${username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched user data:", data);
        setUser(data);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, [username]);

  if (!user) return <ProfileSkeleton />;

  return (
    <div className="m-4 text-center flex flex-col items-center">
      <Avatar
        src={user.profilePictureUrl || "/default-profile-2.png"}
        alt={`${user.username}'s profile picture`}
        size="3xl"
        status={user.isOnline ? "online" : "offline"}
        showStatus
      />
      <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
      <p className="text-gray-600">{user.bio}</p>
      <p className="text-gray-600 mt-2">User Since: {new Date(user.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-600 mt-2">Last online: {user.lastOnline ? new Date(user.lastOnline).toLocaleString() : "N/A"}</p>
      <div className="mt-4">
        {authUser && authUser.username !== user.username && <ProfileFriendshipBar friendUsername={user.username} friendId={user.id} />}
      </div>
    </div>
  );
}
