import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import Header from "./Header";
import "./TableStudent.css";
import Button from "react-bootstrap/Button";

const TableStudent = () => {
    return (
        <div>
            <Header />
            <hr></hr>
            <br></br>
            <h5> นักศึกษาโครงงาน 1</h5>
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
            <hr></hr>
            <br></br>
            <h5> นักศึกษาโครงงาน 2</h5>
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
            <br></br>
            <h5> กรอกเอกสารป.3</h5>
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
    );
};

export default TableStudent;
