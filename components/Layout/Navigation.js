import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useRouter } from "next/router";

import classes from "./Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  const router = useRouter();

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = (event) => {
    event.preventDefault();

    authCtx.logout();
    router.push("/");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Groceries</div>
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
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
