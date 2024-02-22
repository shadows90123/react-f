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
            <div className="Home_studens">
                <div className="Home_studen">
                    <div className="d-grid gap-2 ">
                        <Button variant="danger" size="lg">
                            <Link to="document_i">กรอกเอกสาร ป.1</Link>
                        </Button>
                        <Button variant="danger" size="lg">
                            <Link to="document_i">กรอกเอกสาร ป.2</Link>
                        </Button>
                        <Button variant="danger" size="lg">
                            <Link to="document_i">กรอกเอกสาร ป.3</Link>
                        </Button>
                        <Button variant="danger" size="lg">
                            <Link to="document_i">กรอกเอกสาร ป.4</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
