import React from "react";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import "./HomeStudent.css";
import { Link } from "react-router-dom";

export default function HomeStudent() {
    return (
        <div>
            <Header />
            <hr></hr>
            <div className="Home_student">
                <div className="Home_student-1">
                    <div className="d-grid gap-2  ">
                        <Button size="lg" className="color" variant="danger">
                            <Link
                                to="document_1 "
                                className="text-white text-decoration-none  ;"
                            >
                                กรอกเอกสาร ป.1
                            </Link>
                        </Button>
                        <Button size="lg" className="color" variant="danger">
                            <Link
                                to="document_2"
                                className="text-white text-decoration-none"
                            >
                                กรอกเอกสาร ป.2
                            </Link>
                        </Button>
                        <Button size="lg" className="color" variant="danger">
                            <Link
                                to="document_3"
                                className="text-white text-decoration-none"
                            >
                                กรอกเอกสาร ป.3
                            </Link>
                        </Button>
                        <Button size="lg" className="color" variant="danger">
                            <Link
                                to="document_4"
                                className="text-white text-decoration-none"
                            >
                                กรอกเอกสาร ป.4
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
