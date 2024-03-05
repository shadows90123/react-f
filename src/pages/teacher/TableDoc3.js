import React, { useState, useEffect } from "react";
import Header from "../../components/Teacher/Header";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./HomeTeacher.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getTeacherDocReq, getUserByRole } from "../../libs/Firebase";

const TableDoc3 = () => {
    const [user] = useAuthState(auth);
    const [docList, setDocList] = useState({});
    const [userList, setUserList] = useState({});

    const [docLabel] = useState({
        document_1: "ป.1",
        document_2: "ป.2",
        document_3: "ป.3",
        document_4: "ป.4",
    });
    useEffect(() => {
        const fetchDocList = async () => {
            const data = await getTeacherDocReq(user.uid, "document_3");
            setDocList(data);
        };

        const fetchUserList = async () => {
            const data = await getUserByRole("student");
            setUserList(data);
        };

        fetchDocList();
        fetchUserList();
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
                        <th scope="col">Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {Object.keys(docList).map((d, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    {userList[docList[d].student_uid]?.email}
                                </td>
                                <td>{docLabel[docList[d].doc_type]}</td>
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

export default TableDoc3;
