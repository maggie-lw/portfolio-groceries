import { getAuth } from "firebase/auth";
import { Fragment } from "react";
import EditProfile from "./EditProfile";

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
    <Fragment>
    <section>
      <h3>Name: </h3> <p>{displayName ? displayName : "not provided"}</p>
      <h3>Email: </h3><p>{email}</p>
    </section>
    <section>
      <EditProfile />
    </section>
    </Fragment>
  );
};

export default UserProfile;
