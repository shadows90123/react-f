import React from "react";
import HeaderStudent from "../../components/Student/Header";
import "./Document1.css";
import { Link } from "react-router-dom";

const Document1 = () => {
    return (
        <div>
            <HeaderStudent />
            <br></br>
            <br></br>
            <hr></hr>
            <div className="DocDetails">
                <button class="button1 button2 ">
                    <Link
                        to="create"
                        className="text-white  text-decoration-none"
                    >
                        {" "}
                        กรอกเอกสารป.1
                    </Link>
                </button>
                <button class="button1 button2">เเก้ไขเอกสารป.1</button>
                <button class="button1 button2">Download</button>
            </div>
        </div>
    );
};

export default Document1;
