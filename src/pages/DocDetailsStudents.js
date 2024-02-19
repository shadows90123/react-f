import React from "react";
import HeaderStudent from "../components/HeaderStudent";
import Button from "react-bootstrap/Button";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import "./DocDetailsStudents.css";

const DocDetailsStudents = () => {
    return (
        <div>
            <HeaderStudent />
            <br></br>
            <br></br>
            <hr></hr>

            <button class="button button2">Shadow on Hover</button>
            <button class="button button2">Shadow on Hover</button>
            <button class="button button2">Shadow on Hover</button>
        </div>
    );
};

export default DocDetailsStudents;
