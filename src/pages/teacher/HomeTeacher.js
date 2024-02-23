import HeaderTT from "../../components/HeaderTT";
import Button from "react-bootstrap/Button";
import "./HomeTeacher.css";
import { Link } from "react-router-dom";

const HomeTeacher = () => {
    return (
        <div>
            <HeaderTT />
            <hr></hr>
            <div className="HomeTeacher">
                <div className="HomeTeacher-1">
                    <div className="d-grid gap-2 ">
                        <Button variant="danger" size="lg" className="color">
                            <Link
                                to="document_1"
                                className="text-white text-decoration-none"
                            >
                                เอกสาร ป.1
                            </Link>
                        </Button>
                        <Button variant="danger" size="lg" className="color">
                            <Link
                                to="document_2"
                                className="text-white text-decoration-none"
                            >
                                เอกสาร ป.2
                            </Link>
                        </Button>
                        <Button variant="danger" size="lg" className="color">
                            <Link
                                to="document_3"
                                className="text-white text-decoration-none"
                            >
                                เอกสาร ป.3
                            </Link>
                        </Button>
                        <Button variant="danger" size="lg" className="color">
                            <Link
                                to="document_4"
                                className="text-white text-decoration-none"
                            >
                                เอกสาร ป.4
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTeacher;
