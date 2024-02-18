import React from "react";
import Header from "./components/Header";
import Button from "react-bootstrap/Button";
import "./Home_studen.css";
import { useNavigate } from "react-router-dom";

const Home_studen = () => {
    const navigate = useNavigate();
    const ocDocx = () => {
        navigate("/Docx1");
    };
    return (
        <div>
            <Header />
            <hr></hr>
            <div className="Home_studens">
                <div className="Home_studen">
                    {" "}
                    <div className="d-grid gap-2 ">
                        <Button variant="danger" size="lg" onClick={ocDocx}>
                            กรอกเอกสาร ป.1
                        </Button>
                        <Button variant="danger" size="lg">
                            กรอกเอกสาร ป.2
                        </Button>
                        <Button variant="danger" size="lg">
                            กรอกเอกสาร ป.3
                        </Button>
                        <Button variant="danger" size="lg">
                            กรอกเอกสาร ป.4
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home_studen;
