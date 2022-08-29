import AuthContext from "../store/auth-context";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const AuthGuard = (props) => {
    const { isLoggedIn, initializing } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!initializing) {
            if (!isLoggedIn) {
                router.push('/');
            }
        }
    }, [initializing, router, isLoggedIn]);

    if (initializing) {
        return <h1> Loading</h1>
    }

    if (!initializing && isLoggedIn) {
        return <>{props.children}</>
    }

    return null;
};

export default AuthGuard;