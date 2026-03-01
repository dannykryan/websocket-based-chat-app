"use client";
import { useEffect, useState } from "react";
import Button from "../Button";
import {
  handleAddFriend,
  handleRemoveFriend,
  handleFriendResponse,
  checkFriendStatus,
} from "../../utils/friendship";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

interface ProfileFriendshipBarProps {
  friendUsername: string;
  friendId?: string;
}

const ProfileFriendshipBar = ({
  friendUsername,
  friendId,
}: ProfileFriendshipBarProps) => {
  const [friendCheck, setFriendCheck] = useState<{
    status: string;
    isSender: boolean | null;
  } | null>(null);
  const { user: authUser } = useContext(AuthContext);

  useEffect(() => {
    if (!authUser) return;
    checkFriendStatus(friendUsername, authUser.id).then(setFriendCheck);
  }, [friendUsername, authUser])

  if (!friendCheck) return null;

  return (
    <>
      {friendCheck.status === "ACCEPTED" && (
        <Button onClick={() => handleRemoveFriend(friendUsername)}>
          Remove Friend
        </Button>
      )}
      {friendCheck.status === "NONE" && (
        <Button
          onClick={() => handleAddFriend(friendUsername)}
          btnStyle="green"
        >
          Send Friend Request
        </Button>
      )}
      {friendCheck.status === "PENDING" && friendCheck.isSender === true && (
        <Button btnStyle="green" disabled>
          Request Sent
        </Button>
      )}
      {friendCheck.status === "PENDING" &&
        friendCheck.isSender === false &&
        friendId && (
          <div className="border-2 border-gray-400 p-4 rounded-lg bg-gray-100">
            <p className="mb-2 font-bold">
              {friendUsername} wants to be your friend:
            </p>
            <div className="gap-2 flex">
              <Button
                onClick={() => handleFriendResponse(friendId, true)}
                btnStyle="primary"
              >
                Accept Friend Request
              </Button>
              <Button
                onClick={() => handleFriendResponse(friendId, false)}
                btnStyle="decline"
              >
                Decline Friend Request
              </Button>
            </div>
          </div>
        )}
    </>
  );
};

export default ProfileFriendshipBar;
