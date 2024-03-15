import Header from "./Header";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const AdminEditUserId = () => {
    return (
        <div>
            <Header />
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div
                className="container  rounded-3 p-5  border-2"
                style={{
                    border: "2px solid #7e0202 ",
                }}
            >
                <div
                    className="p-4 mb-5 rounded-top-3 "
                    style={{
                        background: "#7e0202 ",
                    }}
                ></div>
                <table className="table ">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ลำดับ</th>

                            <th scope="col">อีเมล</th>
                            <th scope="col">ประเภท</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>

                            <td>student1@gmail.com</td>
                            <td>นักศึกษา</td>
                            <td>
                                {" "}
                                <Button variant="success" type="submit">
                                    <Link
                                        to={"/EditEmail"}
                                        className="text-white text-decoration-none"
                                    >
                                        เเก้ไข
                                    </Link>
                                </Button>{" "}
                                <Button variant="danger" type="submit">
                                    <Link
                                        to={""}
                                        className="text-white text-decoration-none"
                                    >
                                        ลบ
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>

                            <td>student1@gmail.com</td>
                            <td>นักศึกษา</td>
                            <td>
                                {" "}
                                <Button variant="success" type="submit">
                                    <Link
                                        to={"/EditEmail"}
                                        className="text-white text-decoration-none"
                                    >
                                        เเก้ไข
                                    </Link>
                                </Button>{" "}
                                <Button variant="danger" type="submit">
                                    <Link
                                        to={""}
                                        className="text-white text-decoration-none"
                                    >
                                        ลบ
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>

                            <td>student1@gmail.com</td>
                            <td>นักศึกษา</td>
                            <td>
                                {" "}
                                <Button variant="success" type="submit">
                                    <Link
                                        to={"/EditEmail"}
                                        className="text-white text-decoration-none"
                                    >
                                        เเก้ไข
                                    </Link>
                                </Button>{" "}
                                <Button variant="danger" type="submit">
                                    <Link
                                        to={""}
                                        className="text-white text-decoration-none"
                                    >
                                        ลบ
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEditUserId;
