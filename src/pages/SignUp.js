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
import { registerWithPassword } from "../libs/Firebase";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSignUp = async (e) => {
        e.preventDefault();
        const success = await registerWithPassword(email, password);
        if (success) {
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
                                <div className="radioGroup">
                                    {" "}
                                    <MDBRadio
                                        name="radioGroup"
                                        value="group3"
                                        label="student"
                                        inline
                                    />
                                    <MDBRadio
                                        name="radioGroup"
                                        value="group3"
                                        label="teachar"
                                        inline
                                    />
                                </div>
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

export default SignUp;
