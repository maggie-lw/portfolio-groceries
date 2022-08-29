import Link from "next/link";
import UserProfile from "../../components/Profile/UserProfile";

const Profile = () => {
  return (
    <div>
      <UserProfile />
      <Link href="/profile/change-password">Change Password</Link>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

export default Profile;
