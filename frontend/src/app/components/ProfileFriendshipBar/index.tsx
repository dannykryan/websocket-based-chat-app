import Button from "../Button";
import { handleAddFriend } from "../../utils/friendship";

interface ProfileFriendshipBarProps {
  friendUsername: string;
}

const ProfileFriendshipBar = ({
  friendUsername,
}: ProfileFriendshipBarProps) => {

  return (
    <>
      <Button onClick={() => handleAddFriend(friendUsername)} btnStyle="green">
        Add to Friends
      </Button>
    </>
  );
};

export default ProfileFriendshipBar;
