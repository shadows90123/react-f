import _ from "lodash";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, GetDocument } from "../libs/Firebase";

export function useUserData() {
    const [user] = useAuthState(auth);
    const [data, setData] = useState({});

    useEffect(() => {
        if (!_.isEmpty(user)) {
            GetDocument("users", user?.uid).then((res) => setData(res));
        } else {
            setData({});
        }
    }, [user]);

    return [data];
}
