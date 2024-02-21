import HeaderT from "../components/HeaderT";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import "./Home_teachar.css";
import { useNavigate } from "react-router-dom";

const HomeTeacher4 = () => {
    const navigate = useNavigate();
    const linkDocx = () => {
        navigate("/DocDetails4");
    };
    return (
        <div>
            <HeaderT />
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
                            <Button
                                variant="success"
                                className="button-0"
                                onClick={linkDocx}
                            >
                                เอกสาร
                            </Button>{" "}
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        </div>
    );
};

export default HomeTeacher4;
