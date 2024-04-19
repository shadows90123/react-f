import { useState, useEffect } from "react";
import { auth, GetDocument } from "../libs/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";

import Skeleton from "react-loading-skeleton";
import NotFound from "../components/V2/NotFound";

export const authMiddleware = (allowedRoles) => (Component) => {
    const AuthComponent = (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const [user, loading] = useAuthState(auth);
        const [userRole, setUserRole] = useState(null);

        useEffect(() => {
            const getUserData = async (uid) => {
                const userRef = await GetDocument("users", uid);
                return userRef;
            };

            if (!loading) {
                if (!_.isEmpty(user)) {
                    getUserData(user?.uid).then((res) => {
                        const role = res.role;
                        const pathname = location.pathname;

                        setUserRole(role);
                        if (pathname === "/") {
                            navigate(`/${role}`);
                        } else if (!pathname.includes(role)) {
                            navigate(`/${role}`);
                        }
                    });
                } else {
                    navigate("/login");
                }
            }
        }, [user, loading]);

        if (loading) {
            return <Skeleton />;
        }

        if (userRole && !allowedRoles.includes(userRole)) return <NotFound />;

        return <Component {...props} />;
    };

    return AuthComponent;
};
