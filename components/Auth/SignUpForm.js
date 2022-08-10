import { useState } from "react";
import { useRouter } from "next/router";

import useInput from "../hooks/use-input";

import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDeI2hVzfgQxaivutV8vA4z6n1X8fnSx-o",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
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
      .then(() => {
        router.push("/log-in");
      })
      .catch((err) => {
        alert(err.message);
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
