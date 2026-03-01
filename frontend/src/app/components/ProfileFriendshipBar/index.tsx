"use client";
import { useEffect, useState } from "react";
import Button from "../Button";
import { handleAddFriend, handleRemoveFriend, checkFriendStatus } from "../../utils/friendship";

interface ProfileFriendshipBarProps {
  friendUsername: string;
}

const ProfileFriendshipBar = ({ friendUsername }: ProfileFriendshipBarProps) => {
  const [friendCheck, setFriendCheck] = useState<{ status: string; isSender: boolean | null } | null>(null);

  useEffect(() => {
    checkFriendStatus(friendUsername).then(setFriendCheck);
  }, [friendUsername]);

  console.log("Checked friend status for:", friendUsername, "Result:", friendCheck?.status, "IsSender:", friendCheck?.isSender);

  if (!friendCheck) return null;

  return (
    <>
      {friendCheck.status === "ACCEPTED" && (
        <Button onClick={() => handleRemoveFriend(friendUsername)}>
          Remove Friend
        </Button>
      )}
      {friendCheck.status === "DECLINED" && <p className="text-red-600">Friend request sent</p>}
      {friendCheck.status === "NONE" && (
        <Button onClick={() => handleAddFriend(friendUsername)} btnStyle="green">
          Send Friend Request
        </Button>
      )}
      {friendCheck.status === "PENDING" && friendCheck.isSender === true && (
        <Button btnStyle="green" disabled>Request Sent</Button>
      )}
      {friendCheck.status === "PENDING" && friendCheck.isSender === false && (
        <Button onClick={() => handleAddFriend(friendUsername)} btnStyle="green">
          Accept Friend Request
        </Button>
      )}
    </>
  );
};

export default ProfileFriendshipBar;