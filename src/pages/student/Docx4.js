import { MDBInput } from "mdbreact";
import Button from "react-bootstrap/Button";
import HeaderStudent from "../../components/Student/Header";
import "./Docx1.css";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
    auth,
    addNewDocument,
    updateDocumentById,
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
            const docRef = await addNewDocument(`documents`, formData);
            await addNewDocument(`document_lists`, {
                student_uid: user.uid,
                doc_type: documentType,
                doc_id: docRef.id,
                request_state: false,
                verify_state: false,
                created_at: new Date(),
                updated_at: new Date(),
            });
            alert("Saved!");
            navigate(`/student/${documentType}`);
        } else if (_action === "edit") {
            await updateDocumentById(`documents`, {
                id: docId,
                data: formData,
            });
            alert("Updated!");
            navigate(`/student/${documentType}`);
        }
    };

    useEffect(() => {
        if (_action === "edit" && user) {
            const getData = async () => {
                const [listId, id, data] = await getDocumentByUserId(
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
            <div className="p-5">
                <div
                    className="container-xxl bg-white mt-2 rounded-4   "
                    style={{
                        border: "2px solid #7e0202 ",
                    }}
                >
                    <div
                        className="rounded-top p-3 m-4 text-white d-flex justify-content-center"
                        style={{
                            background: "#7e0202 ",
                        }}
                    >
                        {" "}
                        กรอกเอกสาร ป.4
                    </div>
                    <div className="d-flex justify-content-center col- p-3">
                        <label className=" p-1 ">เสนอหัวข้อโครงงาน</label>
                        <MDBInput
                            style={{ width: 500 }}
                            size="sm"
                            name="project"
                            id="project"
                            type="text1"
                            value={formData.project}
                            onChange={onFormDataChange}
                        />
                    </div>

                    <div className="d-flex justify-content-evenly col- p-3">
                        <label>1. ชื่อ-สกุล</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            type="text"
                            id="name1"
                            name="name1"
                            value={formData.name1}
                            onChange={onFormDataChange}
                        />

                        <label>รหัสนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            type="text"
                            id="pass1"
                            name="pass1"
                            value={formData.pass1}
                            onChange={onFormDataChange}
                        />

                        <label>เบอร์โทรติดต่อ</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            id="number1"
                            name="number1"
                            type="text"
                            value={formData.number1}
                            onChange={onFormDataChange}
                        />
                    </div>

                    <div className="d-flex justify-content-evenly col- p-3">
                        <label>2. ชื่อ-สกุล</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="name2"
                            id="name2"
                            type="text"
                            value={formData.name2}
                            onChange={onFormDataChange}
                        />
                        <label>รหัสนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="pass2"
                            id="pass2"
                            type="text"
                            value={formData.pass2}
                            onChange={onFormDataChange}
                        />
                        <label>เบอร์โทรติดต่อ</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="number2"
                            id="number2"
                            type="text"
                            value={formData.number2}
                            onChange={onFormDataChange}
                        />
                    </div>

                    <div className="d-flex  justify-content-evenly col- p-3">
                        <label>3. ชื่อ-สกุล</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="name3"
                            id="name3"
                            type="text"
                            value={formData.name3}
                            onChange={onFormDataChange}
                        />

                        <label>รหัสนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="pass3"
                            id="pass3"
                            type="text"
                            value={formData.pass3}
                            onChange={onFormDataChange}
                        />

                        <label>เบอร์โทรติดต่อ</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="number3"
                            id="number3"
                            type="text"
                            value={formData.number3}
                            onChange={onFormDataChange}
                        />
                    </div>
                    <div className="d-flex justify-content-evenly p-3">
                        <label>&nbsp;4.สาขาวิชา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="major"
                            type="text"
                            value={formData.major}
                            onChange={onFormDataChange}
                        />

                        <label>5.จำนวนเงิน</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="money"
                            id="money"
                            type="text"
                            value={formData.money}
                            onChange={onFormDataChange}
                        />
                        <label>6.จำนวนเงินภาษาไทย</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
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
