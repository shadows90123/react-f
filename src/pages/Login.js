import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";

import { auth, db, loginWithPassword } from "../libs/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "react-bootstrap/Button";

const Login = () => {
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e) => {
        e.preventDefault();
        const success = await loginWithPassword(email, password);

        if (success) {
            // navigate("/");
            if (user) {
                // navigate
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                const data = docSnap.exists() ? docSnap.data() : null;

                if (data) {
                    navigate(`/${data.user_type}`);
                }
            }
        } else {
            alert("Login Failed!");
        }
    };

    const onSignUp = () => {
        navigate("/SignUp");
    };

    useEffect(() => {
        const getUserData = async (uid) => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data() : null;
        };

        if (user) {
            // navigate
            getUserData(user.uid).then((res) => {
                navigate(`/${res.user_type}`);
            });
        }
    }, [user]);

    if (loading) {
        return <p>loading login</p>;
    }

    return (
        <div>
            <MDBContainer fluid>
                <MDBRow className="d-flex justify-content-center align-items-center h-100">
                    <MDBCol col="12">
                        <MDBCard
                            className="bg-white my-5 mx-auto"
                            style={{ borderRadius: "1rem", maxWidth: "500px" }}
                        >
                            <MDBCardBody className="p-5 w-100 d-flex flex-column">
                                <h2 className="fw-bold mb-2 text-center">
                                    Sign in
                                </h2>
                                <p className="text-black-50 mb-3">
                                    Please enter your login and password!
                                </p>
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    label="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    size="lg"
                                />
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    label="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    name="password"
                                    type="password"
                                    size="lg"
                                />
                                <MDBCheckbox
                                    name="flexCheck"
                                    className="mb-4"
                                    label="Remember password"
                                />
                                <Button
                                    variant="primary"
                                    className="mb-2 w-100"
                                    size="lg"
                                    onClick={onLogin}
                                >
                                    Login
                                </Button>{" "}
                                <hr className="my-2" />
                                <Button
                                    variant="danger"
                                    className="mb-2 w-100"
                                    size="lg"
                                    onClick={onSignUp}
                                >
                                    Register
                                </Button>{" "}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Login;
