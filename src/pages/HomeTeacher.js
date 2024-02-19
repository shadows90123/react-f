// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
import Header_t from "../components/HeaderT";
import "./Home_teachar.css";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import "./Home_teachar.css";

const HomeTeacher = () => {
    return (
        <div>
            <Header_t />
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
                    <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            {" "}
                            <Button variant="success" className="button-0">
                                เอกสาร
                            </Button>{" "}
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        </div>
    );
};

export default HomeTeacher;

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
