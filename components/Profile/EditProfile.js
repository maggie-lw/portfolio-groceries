import { getAuth, updateProfile } from "firebase/auth";
import { useRef } from "react";
import { useRouter } from "next/router";

const EditProfile = () => {
  const auth = getAuth();
  const nameInputRef = useRef();
  const router = useRouter();

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
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Your name: </label>
        <input type="name" id="name" ref={nameInputRef} />
      </div>
      <div>
        <button>Save</button>
      </div>
    </form>
  );
};

export default EditProfile;
