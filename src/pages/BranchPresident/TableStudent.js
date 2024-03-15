import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import HeaderBP from "./HeaderBP";
import "./TableStudent.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const TableStudent = () => {
    return (
        <div>
            <Header />
            <hr></hr>
            <br></br>
            <div
                className="container-xxl bg-white mt-2 rounded-top  p-2  "
                style={{
                    border: "2px solid #7e0202 ",
                }}
            >
                <div
                    className="rounded-top p-3 m-4 text-white d-flex justify-content-center"
                    style={{
                        background: "#7e0202 ",
                    }}
                >
                    {" "}
                    นักศึกษาโครงงาน 1
                </div>

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">ชื่อโครงงาน</th>
                            <th scope="col">ชื่อนักศึกษา</th>
                            <th scope="col">ชื่ออาจารย์ที่ปรึกษา</th>
                            <th scope="col">ผ่าน &nbsp; &nbsp;ไม่ผ่าน</th>
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
                                <div className="Checkbox-1">
                                    <MDBCheckbox />
                                    &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;{" "}
                                    <MDBCheckbox />
                                </div>
                            </td>
                            <td>
                                <Button variant="success" className="button-0">
                                    <Link
                                        to={""}
                                        className="text-white text-decoration-none"
                                    >
                                        Submit
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            </div>

            <hr></hr>
            <br></br>
            <div
                className="container-xxl bg-white mt-2 rounded-top  p-2  "
                style={{
                    border: "2px solid #7e0202 ",
                }}
            >
                <div
                    className="rounded-top p-3 m-4 text-white d-flex justify-content-center"
                    style={{
                        background: "#7e0202 ",
                    }}
                >
                    {" "}
                    นักศึกษาโครงงาน 2
                </div>

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">ชื่อโครงงาน</th>
                            <th scope="col">ชื่อนักศึกษา</th>
                            <th scope="col">ชื่ออาจารย์ที่ปรึกษา</th>
                            <th scope="col">ผ่าน &nbsp; &nbsp;ไม่ผ่าน</th>
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
                                <div className="Checkbox-1">
                                    <MDBCheckbox />
                                    &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;{" "}
                                    <MDBCheckbox />
                                </div>
                            </td>
                            <td>
                                <Button variant="success" className="button-0">
                                    <Link
                                        to={""}
                                        className="text-white text-decoration-none"
                                    >
                                        Submit
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            </div>
            <hr></hr>
            <br></br>
            <div
                className="container-xxl bg-white mb-2 rounded-top  p-2  "
                style={{
                    border: "2px solid #7e0202 ",
                }}
            >
                <div
                    className="rounded-top p-3 m-4 text-white d-flex justify-content-center"
                    style={{
                        background: "#7e0202 ",
                    }}
                >
                    {" "}
                    กรอกเอกสารป.3
                </div>

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">ชื่อโครงงาน</th>
                            <th scope="col">ชื่อนักศึกษา</th>
                            <th scope="col">ชื่ออาจารย์ที่ปรึกษา</th>
                            <th scope="col">
                                ส่งเล่มครบ &nbsp; &nbsp;ส่งเล่มครบไม่
                            </th>
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
                                <div className="Checkbox-1">
                                    <MDBCheckbox />
                                    &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                                    &nbsp;&nbsp; &nbsp; &nbsp; <MDBCheckbox />
                                </div>
                            </td>
                            <td>
                                <Button variant="success" className="button-0">
                                    <Link
                                        to={""}
                                        className="text-white text-decoration-none"
                                    >
                                        Submit
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    );
};

export default TableStudent;
