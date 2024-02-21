import HeaderTT from "../components/HeaderTT";
import Button from "react-bootstrap/Button";
import "./Home_studen.css";
import { useNavigate } from "react-router-dom";

const HomeT = () => {
    const navigate = useNavigate();
    const onHomeT1 = () => {
        navigate("/HomeTeacher");
    };
    const onHomeT2 = () => {
        navigate("/HomeTeacher2");
    };
    const onHomeT3 = () => {
        navigate("/HomeTeacher3");
    };
    const onHomeT4 = () => {
        navigate("/HomeTeacher4");
    };
    return (
        <div>
            <HeaderTT />
            <hr></hr>
            <div className="Home_studens">
                <div className="Home_studen">
                    {" "}
                    <div className="d-grid gap-2 ">
                        <Button variant="danger" size="lg" onClick={onHomeT1}>
                            กรอกเอกสาร ป.1
                        </Button>
                        <Button variant="danger" size="lg" onClick={onHomeT2}>
                            กรอกเอกสาร ป.2
                        </Button>
                        <Button variant="danger" size="lg" onClick={onHomeT3}>
                            กรอกเอกสาร ป.3
                        </Button>
                        <Button variant="danger" size="lg" onClick={onHomeT4}>
                            กรอกเอกสาร ป.4
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeT;
