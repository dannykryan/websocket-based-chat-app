const handleAddFriend = async (friendUsername: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/friends/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ friendUsername }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Friend request sent!");
      } else {
        alert(data.error || "Failed to send friend request.");
      }
    } catch (err) {
      alert("Network error: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

export { handleAddFriend };