import { useContext } from "react";
import AuthContext from "../store/auth-context";

import classes from "./Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = (event) => {
    event.preventDefault();

    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">React Groceries</Link>
      </div>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link href="/log-in">Login</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link href="/sign-up">Sign up</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link href="/lists">Home</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
