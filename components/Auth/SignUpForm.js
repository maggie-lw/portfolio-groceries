import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../store/auth-context";

import useInput from "../hooks/use-input";

import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
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

    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
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
    <section className={classes.signup}>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            required
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && <p>Email must contain "@"!</p>}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            required
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && (
            <p>Password must be at least 8 characters long!</p>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && <button disabled={!formIsValid}>Sign Up</button>}
          {isLoading && <p>Signing up...</p>}
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
