import React, { useState, useEffect } from "react";
import Header from "../../components/Teacher/Header";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./HomeTeacher.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getTeacherDocReq, getStudentById } from "../../libs/Firebase";

const TableDoc2 = () => {
    const [user] = useAuthState(auth);
    const [docList, setDocList] = useState({});

    useEffect(() => {
        const fetchDocList = async () => {
            const data = await getTeacherDocReq(user.uid, "document_2");
            setDocList(data);
        };

        fetchDocList();
    }, []);

    return (
        <div>
            <Header />
            <hr></hr>
            <MDBTable className="form-table">
                <MDBTableHead>
                    <tr>
                        <th scope="col">ลำดับ</th>
                        <th scope="col">Email</th>
                        <th scope="col">เอกสาร</th>
                        <th scope="col">สถานะ</th>
                        <th scope="col">Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {Object.keys(docList).map((d, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{docList[d].student_uid}</td>
                                <td></td>
                                <td></td>
                                <td>
                                    <Button
                                        variant="success"
                                        className="button-0"
                                    >
                                        <Link
                                            to={`detail/${d}`}
                                            className="text-white text-decoration-none"
                                        >
                                            เอกสาร
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    {/* <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <Button variant="success" className="button-0">
                                <Link
                                    to="detail"
                                    className="text-white text-decoration-none"
                                >
                                    เอกสาร
                                </Link>
                            </Button>
                        </td>
                    </tr> */}
                </MDBTableBody>
            </MDBTable>
        </div>
    );
};

export default TableDoc2;
