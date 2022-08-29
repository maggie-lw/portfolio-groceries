import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const auth = getAuth();
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const userIsLoggedIn = !!token;

  useEffect(() => {
    auth.onAuthStateChanged((token) => {
      if (token) {
        setToken(token);
      } else {
        setToken(null);
      }
      setInitializing(false);
    })
  }, []);

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    auth.signOut();
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    initializing
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
