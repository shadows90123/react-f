import React from "react";
import HeaderStudent from "../../components/Student/Header";
import "./Document1.css";
import { Link } from "react-router-dom";

const Document2 = () => {
    return (
        <div>
            <HeaderStudent />
            <br></br>
            <br></br>
            <hr></hr>
            <div className="DocDetails">
                <button class="button1 button2">
                    <Link to="create"> กรอกเอกสารป.2</Link>
                </button>
                <button class="button1 button2">เเก้ไขเอกสารป.2</button>
                <button class="button1 button2">Download</button>
            </div>
        </div>
    );
};

export default Document2;
