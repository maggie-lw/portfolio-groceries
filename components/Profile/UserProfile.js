import { useContext } from "react";
import AuthContext from "../store/auth-context";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);

  let data = {};
  let userInfo = [];

  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDeI2hVzfgQxaivutV8vA4z6n1X8fnSx-o",
    {
      method: "POST",
      body: JSON.stringify({ idToken: authCtx.token }),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => {
      if (response.ok) {
        data = response.json();
      } else {
        return response.json().then((data) => {
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    })
    .catch((err) => {
      alert(err.message);
    });

  return (
    <section>
      <h3>Name: </h3>
      <h3>Email: </h3>
    </section>
  );
};

export default UserProfile;
