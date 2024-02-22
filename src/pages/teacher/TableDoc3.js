import Header from "../../components/Teacher/Header";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./HomeTeacher.css";
const TableDoc3 = () => {
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
                    <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <Button variant="success" className="button-0">
                                <Link to="detail">เอกสาร</Link>
                            </Button>
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        </div>
    );
};

export default TableDoc3;
