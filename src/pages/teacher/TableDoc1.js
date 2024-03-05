import React, { useState, useEffect } from "react";
// import SignatureCanvas from "react-signature-canvas";
import Header from "../../components/Teacher/Header";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import "./HomeTeacher.css";
import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getTeacherDocReq, getUserByRole } from "../../libs/Firebase";

const TableDoc1 = () => {
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
            const data = await getTeacherDocReq(user.uid, "document_1");
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

export default TableDoc1;

// const [sign, setSign] = useState("");
// const [url, setUrl] = useState("");

// const handleClear = () => {
//     sign.clear();
// };
// const handleSave = () => {
//     setUrl(sign.getTrimmedCanvas().toDataURL("sign.png"));
// };

//<div className="box">
//     <div style={{ border: "2px solid black", width: 500, height: 200 }}>
//         <SignatureCanvas
//             canvasProps={{
//                 width: 500,
//                 height: 200,
//                 className: "sigCanvas",
//             }}
//             ref={(data) => setSign(data)}
//         />
//     </div>
//     <button onClick={handleClear}> Clear</button>
//     <button onClick={handleSave}>Save</button>
//     <br></br>
//     <br></br>
//     <img src={url} />
// </div>
