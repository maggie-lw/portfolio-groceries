import { useState, useContext } from "react";
import { useRouter } from "next/dist/client/router";
import AuthContext from "../store/auth-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import useInput from "../hooks/use-input";

import classes from "./LogInForm.module.css";

const LogInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  const authCtx = useContext(AuthContext);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetHandler: emailResetHandler,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetHandler: passwordResetHandler,
  } = useInput((val) => val.length > 7);

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        authCtx.login(userCredential.user.accessToken);
      })
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
        setIsLoading(false);
      });

    emailResetHandler();
    passwordResetHandler();
  };

  const emailInputClasses = emailInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const passwordInputClasses = passwordInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <section className={classes.login}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            required
          />
          {emailInputHasError && <p>Email must contain "@"!</p>}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            required
          />
          {passwordInputHasError && (
            <p>Password must be at least 8 characters long!</p>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && <button disabled={!formIsValid}>Login</button>}
          {isLoading && <p>Logging in...</p>}
        </div>
      </form>
    </section>
  );
};

export default LogInForm;
