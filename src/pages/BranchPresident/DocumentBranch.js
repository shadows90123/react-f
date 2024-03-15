import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import HeaderBP from "./HeaderBP";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const DocumentBranch = () => {
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
                    เอกสารทั้งหมด
                </div>

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">ชื่อโครงงาน</th>
                            <th scope="col">Email</th>
                            <th scope="col">เอกสาร</th>
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
                                <Button variant="success" className="button-0">
                                    <Link
                                        to={""}
                                        className="text-white text-decoration-none"
                                    >
                                        Download
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

export default DocumentBranch;
