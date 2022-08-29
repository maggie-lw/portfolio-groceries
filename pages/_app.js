import Layout from "../components/Layout/Layout";
import { AuthContextProvider } from "../components/store/auth-context";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import AuthGuard from "../components/Auth/AuthGuard";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeI2hVzfgQxaivutV8vA4z6n1X8fnSx-o",
  authDomain: "portfolio-groceries.firebaseapp.com",
  databaseURL:
    "https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-groceries",
  storageBucket: "portfolio-groceries.appspot.com",
  messagingSenderId: "230427509025",
  appId: "1:230427509025:web:4b1929dae3082eaad43e60",
};

// Initialize Firebase
initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
