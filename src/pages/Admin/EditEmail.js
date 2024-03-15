import React from "react";
import Header from "../../components/Admin/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditEmail = () => {
    return (
        <div>
            <Header />
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div
                className="container  rounded-3 border-2 p-5  col-sm-5  "
                style={{
                    border: "2px solid #7e0202 ",
                }}
            >
                <div
                    className=" p-4 mb-5 rounded-top-3 "
                    style={{
                        background: "#7e0202 ",
                    }}
                ></div>
                <Form>
                    <Form.Group
                        className="mb-3 col- "
                        controlId="formBasicEmail"
                    >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group
                        className="mb-3 col- "
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group
                        className="mb-3 col- "
                        controlId="formBasicPassword"
                    >
                        <Form.Label>EditPassword</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="EditPassword"
                        />
                    </Form.Group>
                    <div className="d-flex flex-row col-">
                        <Form.Group
                            className="mb-3 m-1"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="นักศึกษา" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3  m-1  col-"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="อาจารย์" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3  m-1 col- "
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="ประธานสาขา" />
                        </Form.Group>
                    </div>

                    <Button variant="success" type="submit">
                        submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default EditEmail;
