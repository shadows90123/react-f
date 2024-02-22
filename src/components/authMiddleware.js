import React, { useState, useEffect } from "react";
import { auth, db } from "../libs/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

export const authMiddleware = (allowedRoles) => (Component) => {
    const AuthComponent = (props) => {
        const navigate = useNavigate();
        const [user, loading] = useAuthState(auth);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [userRole, setUserRole] = useState(null);

        useEffect(() => {
            const getUserData = async (uid) => {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);
                return docSnap.exists() ? docSnap.data() : null;
            };

            if (user) {
                setIsAuthenticated(true);
                getUserData(user.uid).then((res) => {
                    setUserRole(res.user_type);
                });
            } else {
                setIsAuthenticated(false);
                navigate("/");
            }
        }, [user]);

        if (loading) {
            return (
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            );
        }

        // if (!isAuthenticated) return navigate("/");

        if (userRole && !allowedRoles.includes(userRole))
            return <>404 NOT FOUND</>;

        return <Component {...props} />;
    };

    return AuthComponent;
};
