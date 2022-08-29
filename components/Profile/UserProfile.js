import { getAuth } from "firebase/auth";
import EditProfile from "./EditProfile";
import Link from "next/link";

import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const auth = getAuth();

  const user = auth.currentUser;

  let displayName;
  let email;

  if (user !== null) {
    displayName = user.displayName;
    email = user.email;
  } else {
    console.log("error retrieving data");
  }

  return (
    <div className={classes.profile}>
      <section>
        <h3>Name: </h3> <p>{displayName ? displayName : "not provided"}</p>
        <h3>Email: </h3>
        <p>{email}</p>
      </section>
      <section>
        <EditProfile />
      </section>
      <section className={classes.link}>
        <Link href="/profile/change-password">Change Password</Link>
      </section>
    </div>
  );
};

export default UserProfile;
