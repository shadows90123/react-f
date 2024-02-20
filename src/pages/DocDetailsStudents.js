import React from "react";
import HeaderStudent from "../components/HeaderStudent";
import "./DocDetailsStudents.css";
import { useNavigate } from "react-router-dom";

const DocDetailsStudents = () => {
    const navigate = useNavigate();
    const onDocx1 = () => {
        navigate("/Docx1");
    };
    return (
        <div>
            <HeaderStudent />
            <br></br>
            <br></br>
            <hr></hr>
            <div className="DocDetails">
                {" "}
                <button class="button1 button2" onClick={onDocx1}>
                    กรอกเอกสารป.1
                </button>
                <button class="button1 button2">เเก้ไขเอกสารป.1</button>
                <button class="button1 button2">Download</button>
            </div>
        </div>
    );
};

export default DocDetailsStudents;
