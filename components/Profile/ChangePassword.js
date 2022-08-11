import { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../store/auth-context";
import useInput from "../hooks/use-input";

import classes from './ChangePassword.module.css';

const ChangePassword = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    hasError: newPasswordInputHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
  } = useInput((val) => val.length > 7);

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDeI2hVzfgQxaivutV8vA4z6n1X8fnSx-o",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "New password change failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        router.push("/profile");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const passwordInputClasses = newPasswordInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <section className={classes.changePass}>
    <form onSubmit={submitHandler}>
      <div className={passwordInputClasses}>
        <label htmlFor="new-password">New Password: </label>
        <input
          type="password"
          id="new-password"
          value={enteredNewPassword}
          onChange={newPasswordChangeHandler}
          onBlur={newPasswordBlurHandler}
        />
        {newPasswordInputHasError && <p>Password needs to be at least 8 characters long!</p>}
      </div>
      <div className={classes.actions}>
        <button disabled={!enteredNewPasswordIsValid}>Change Password</button>
      </div>
    </form>
    </section>
  );
};

export default ChangePassword;
