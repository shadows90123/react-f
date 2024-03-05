import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRadio,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { db, registerWithPassword } from "../libs/Firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    const onSignUp = async (e) => {
        e.preventDefault();
        if (email === "" && password === "") {
            alert("กรอกข้อมูลให้ครบ");
            return;
        }
        const user = await registerWithPassword(email, password);

        if (user?.uid) {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                name: user.displayName,
                user_type: role,
            });
            navigate("/");
        } else {
            alert("Sign Up Failed!");
        }
    };
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
                                    Sign up
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
                                    required
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
                                    required
                                />
                                <div className="radioGroup">
                                    <MDBRadio
                                        name="role"
                                        value="student"
                                        label="student"
                                        inline
                                        checked
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        required
                                    />
                                    <MDBRadio
                                        name="role"
                                        value="teacher"
                                        label="teacher"
                                        inline
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <Button
                                    variant="danger"
                                    className="mb-2 w-100"
                                    size="lg"
                                    onClick={onSignUp}
                                >
                                    Register
                                </Button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default SignUp;
