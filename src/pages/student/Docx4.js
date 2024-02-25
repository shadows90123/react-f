import { MDBInput } from "mdbreact";
import Button from "react-bootstrap/Button";
import HeaderStudent from "../../components/Student/Header";
import "./Docx1.css";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
    auth,
    createDocument,
    updateDocument,
    getDocumentByUserId,
} from "../../libs/Firebase";

const Docx4 = ({ action }) => {
    const navigate = useNavigate();
    const [_action] = useState(action);
    const [user] = useAuthState(auth);
    const [documentType] = useState("document_4");
    const [docId, setDocId] = useState(null);

    const [formData, setFromData] = useState({
        name1: "",
        pass1: "",
        number1: "",
        name2: "",
        pass2: "",
        number2: "",
        name3: "",
        pass3: "",
        number3: "",
        project: "",
        major: "",
        money: "",
        money1: "",
    });

    const onFormDataChange = (e) => {
        const { name, value, type } = e.target;
        setFromData({
            ...formData,
            [name]: type === "checkbox" ? !formData[name] : value,
        });
    };

    const onSave = async () => {
        if (_action === "create") {
            alert("Saved!");
            await createDocument(user.uid, documentType, formData);
            navigate(`/student/${documentType}`);
        } else if (_action === "edit") {
            alert("Updated!");
            await updateDocument(docId, formData);
            navigate(`/student/${documentType}`);
        }
    };

    useEffect(() => {
        if (_action === "edit" && user) {
            const getData = async () => {
                const [id, data] = await getDocumentByUserId(
                    user.uid,
                    documentType
                );
                if (id && data) {
                    setDocId(id);
                    setFromData(data);
                }
            };
            getData();
        }
    }, [user]);

    return (
        <div>
            <HeaderStudent />
            <div className="from">
                <div className="frame-3">
                    <div className="title"> กรอกเอกสาร ป.4</div>
                    <div className="input">
                        <label>1. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="name1"
                            name="name1"
                            value={formData.name1}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="pass1"
                            name="pass1"
                            value={formData.pass1}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            background
                            id="number1"
                            name="number1"
                            type="text"
                            value={formData.number1}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                    </div>
                    <div className="input">
                        <label>2. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            name="name2"
                            id="name2"
                            type="text"
                            value={formData.name2}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            name="pass2"
                            id="pass2"
                            type="text"
                            value={formData.pass2}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            name="number2"
                            id="number2"
                            type="text"
                            value={formData.number2}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                    </div>
                    <div className="input">
                        <label>3. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            name="name3"
                            id="name3"
                            type="text"
                            value={formData.name3}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            name="pass3"
                            id="pass3"
                            type="text"
                            value={formData.pass3}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            name="number3"
                            id="number3"
                            type="text"
                            value={formData.number3}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                    </div>

                    <div className="input">
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
                            เสนอหัวข้อโครงงาน&nbsp;
                        </label>
                        <MDBInput
                            name="project"
                            id="project"
                            type="text1"
                            value={formData.project}
                            onChange={onFormDataChange}
                        />
                        &nbsp; &nbsp;
                    </div>
                    <div className="input">
                        <label>&nbsp;5.สาขาวิชา</label>
                        <MDBInput
                            name="major"
                            type="text"
                            value={formData.major}
                            onChange={onFormDataChange}
                        />
                        &nbsp; &nbsp;
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.จำนวนเงิน
                        </label>
                        <MDBInput
                            name="money"
                            id="money"
                            type="text"
                            value={formData.money}
                            onChange={onFormDataChange}
                        />
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7.จำนวนเงินภาษาไทย
                        </label>
                        <MDBInput
                            name="money1"
                            id="money1"
                            type="text"
                            value={formData.money1}
                            onChange={onFormDataChange}
                        />
                    </div>

                    <div className="button">
                        <div>
                            <Button
                                variant="success"
                                className="button-1"
                                onClick={onSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Docx4;
