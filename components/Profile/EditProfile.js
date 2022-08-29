import { getAuth, updateProfile } from "firebase/auth";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

import classes from "./EditProfile.module.css";

const EditProfile = () => {
  const auth = getAuth();
  const nameInputRef = useRef();
  const router = useRouter();

  const [toggleChangeName, setToggleChangeName] = useState(false);

  const toggleNameHandler = () => {
    setToggleChangeName(!toggleChangeName);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    updateProfile(auth.currentUser, {
      displayName: nameInputRef.current.value,
    })
      .then(() => {
        router.push("/profile");
      })
      .catch((err) => {
        alert(err.message);
      });

    setToggleChangeName(false);
  };

  return (
    <div className={classes.actions}>
      {toggleChangeName && (
        <form onSubmit={submitHandler}>
          <div className={classes.form}>
            <label htmlFor="name">Your name: </label>
            <input type="name" id="name" ref={nameInputRef} />
          </div>
          <div>
            <button>Save</button>
          </div>
        </form>
      )}
      <button onClick={toggleNameHandler}>
        {!toggleChangeName ? "Update Name" : "Cancel"}
      </button>
    </div>
  );
};

export default EditProfile;
