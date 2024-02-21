import HeaderStudent from "../components/HeaderStudent";
import "./DocDetailsStudents.css";
import { useNavigate } from "react-router-dom";

const DocDetailsStudents2 = () => {
    const navigate = useNavigate();
    const onDocx2 = () => {
        navigate("/Docx2");
    };
    return (
        <div>
            <HeaderStudent />
            <br></br>
            <br></br>
            <hr></hr>
            <div className="DocDetails">
                {" "}
                <button class="button1 button2" onClick={onDocx2}>
                    กรอกเอกสารป.2
                </button>
                <button class="button1 button2">เเก้ไขเอกสารป.2</button>
                <button class="button1 button2">Download</button>
            </div>
        </div>
    );
};

export default DocDetailsStudents2;
