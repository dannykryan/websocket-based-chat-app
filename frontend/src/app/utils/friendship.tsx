interface FriendStatusResponse {
  status: "FRIEND" | "PENDING" | "DECLINED" | "NONE";
  isSender: boolean | null;     // null = no active request exists
}

interface CheckFriendStatusResult {
  status: FriendStatusResponse["status"];
  isSender: FriendStatusResponse["isSender"];
}

/**
 * Checks the friendship status between current user and target username.
 * 
 * @throws {Error} if the request fails (network error, unauthorized, server error, invalid json, etc.)
 */
const checkFriendStatus = async (
  friendUsername: string,
  currentUserId: string,
): Promise<CheckFriendStatusResult> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  let res: Response;
  try {
    res = await fetch(
      `http://localhost:4000/api/friends/status/${friendUsername}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (err) {
    throw new Error(
      `Network error while checking friend status: ${
        err instanceof Error ? err.message : "Unknown error"
      }`,
    );
  }

  let data: any;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!res.ok) {
    throw new Error(
      data?.error || `Failed to check friend status (${res.status})`,
    );
  }

  const status = data.status as CheckFriendStatusResult["status"];
  const isSender = data.senderId === currentUserId;

  return { status, isSender };
};

const handleAddFriend = async (friendUsername: string): Promise<void> => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/api/friends/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ friendUsername }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed to send friend request.");
};

const handleFriendResponse = async (
  senderId: string,
  friendRequestResponse: boolean,
): Promise<void> => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/api/friends/respond", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ senderId, friendRequestResponse }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed to respond to friend request.");
};

const handleRemoveFriend = async (username: string): Promise<void> => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/api/friends/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed to remove friend.");
};

export {
  handleAddFriend,
  handleRemoveFriend,
  handleFriendResponse,
  checkFriendStatus,
};
