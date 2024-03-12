import HeaderB from "./HeaderB";
import Button from "react-bootstrap/Button";
import "./HomeTeacher.css";
import { Link } from "react-router-dom";

const BranchPresidentHome = () => {
    return (
        <div>
            <div>
                <HeaderB />
                <hr></hr>
                <div className="HomeTeacher">
                    <div className="HomeTeacher-1">
                        <div className="d-grid gap-2 ">
                            <Button
                                variant="danger"
                                size="lg"
                                className="color"
                            >
                                <Link
                                    to="/"
                                    className="text-white text-decoration-none"
                                >
                                    ข้อมูลกรอกเอกสารของนักศึกษาทั้งหมด
                                </Link>
                            </Button>
                            <Button
                                variant="danger"
                                size="lg"
                                className="color"
                            >
                                <Link
                                    to="/"
                                    className="text-white text-decoration-none"
                                >
                                    ตรวจสอบสิทธิ์เข้าสอบ
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BranchPresidentHome;
