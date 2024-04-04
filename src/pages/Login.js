import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import { auth, loginWithPassword, GetDocument } from "../libs/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "react-bootstrap/Button";

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";

const Login = () => {
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (e) => {
        e.preventDefault();
        const success = await loginWithPassword(email, password);

        if (success) {
            if (!_.isEmpty(user)) {
                const userRef = await GetDocument("users", user?.uid);
                navigate(`/${userRef.user_type}`);
            }
        } else {
            toast.error(`เกิดข้อผิดพลาด : เข้าสู่ระบบไม่สำเร็จ`);
        }
    };

    useEffect(() => {
        if (!_.isEmpty(user)) {
            const getUserData = async (uid) => {
                const userRef = await GetDocument("users", uid);
                navigate(`/${userRef.user_type}`);
            };

            getUserData(user?.uid);
        }
    }, [user]);

    if (loading) {
        return <Skeleton />;
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
                                    className="mb-2 w-100 "
                                    size="lg"
                                >
                                    <Link
                                        to="register"
                                        className="text-white text-decoration-none"
                                    >
                                        Register
                                    </Link>
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
