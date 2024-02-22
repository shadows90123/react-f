import HeaderTT from "../../components/HeaderTT";
import Button from "react-bootstrap/Button";
import "./HomeTeacher.css";
import { Link } from "react-router-dom";

const HomeTeacher = () => {
    return (
        <div>
            <HeaderTT />
            <hr></hr>
            <div className="Home_teacher">
                <div className="Home_teacher">
                    <div className="d-grid gap-2 ">
                        <Button variant="danger" size="lg">
                            <Link to="document_1">กรอกเอกสาร ป.1</Link>
                        </Button>
                        <Button variant="danger" size="lg">
                            <Link to="document_2">กรอกเอกสาร ป.2</Link>
                        </Button>
                        <Button variant="danger" size="lg">
                            <Link to="document_3">กรอกเอกสาร ป.3</Link>
                        </Button>
                        <Button variant="danger" size="lg">
                            <Link to="document_4">กรอกเอกสาร ป.4</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTeacher;
