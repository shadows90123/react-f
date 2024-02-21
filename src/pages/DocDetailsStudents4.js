import HeaderStudent from "../components/HeaderStudent";
import "./DocDetailsStudents.css";
import { useNavigate } from "react-router-dom";

const DocDetailsStudents4 = () => {
    const navigate = useNavigate();
    const onDocx4 = () => {
        navigate("/Docx4");
    };
    return (
        <div>
            <HeaderStudent />
            <br></br>
            <br></br>
            <hr></hr>
            <div className="DocDetails">
                {" "}
                <button class="button1 button2" onClick={onDocx4}>
                    กรอกเอกสารป.4
                </button>
                <button class="button1 button2">เเก้ไขเอกสารป.3</button>
                <button class="button1 button2">Download</button>
            </div>
        </div>
    );
};

export default DocDetailsStudents4;
