import Link from "next/link";
import UserProfile from "../../components/Profile/UserProfile";

const Profile = () => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

Profile.requireAuth = true;

export default Profile;
