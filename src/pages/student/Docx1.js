import React, { useEffect, useState } from "react";
import "./Docx1.css";
import { MDBInput } from "mdbreact";
import { MDBCheckbox, MDBRadio } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import HeaderStudent from "../../components/Student/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
    auth,
    createDocument,
    updateDocument,
    getDocumentByUserId,
} from "../../libs/Firebase";

const Docx1 = ({ action }) => {
    const navigate = useNavigate();
    const [_action] = useState(action);
    const [user] = useAuthState(auth);
    const [documentType] = useState("document_1");
    const [docId, setDocId] = useState(null);
    const [formData, setFromData] = useState({
        name1: "",
        name2: "",
        name3: "",
        pass1: "",
        pass2: "",
        pass3: "",
        number1: "",
        number2: "",
        number3: "",
        project: "",
        teacher1: "",
        teacher2: "",
        student1: "",
        student2: "",
        student3: "",
        checkGroup1: false,
        checkGroup2: false,
        checkGroup3: false,
        checkGroup4: false,
        checkGroup5: false,
        checkGroup6: false,
        radioGroup: "",
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
                <div className="frame">
                    <div className="title"> กรอกเอกสาร ป.1</div>
                    <div className="formcheck">
                        <MDBCheckbox
                            name="checkGroup1"
                            value={formData.checkGroup1}
                            checked={formData.checkGroup1}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;โยธา"
                        />
                        <MDBCheckbox
                            name="checkGroup2"
                            value={formData.checkGroup2}
                            checked={formData.checkGroup2}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;อุสาหการ"
                        />
                        <MDBCheckbox
                            name="checkGroup3"
                            value={formData.checkGroup3}
                            checked={formData.checkGroup3}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;สิ่งเเวดล้อม"
                        />
                        <MDBCheckbox
                            name="checkGroup4"
                            value={formData.checkGroup4}
                            checked={formData.checkGroup4}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;คอมพิวเตอร์"
                        />
                        <MDBCheckbox
                            name="checkGroup5"
                            value={formData.checkGroup5}
                            checked={formData.checkGroup5}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;พลังงาน"
                        />
                    </div>
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

                    <div className="changeradio">
                        <label>4. ลงทะเบียนเรียน </label>
                        <MDBRadio
                            name="radioGroup"
                            value="group1"
                            checked={formData.radioGroup === "group1"}
                            label="กลุ่ม 1"
                            onChange={onFormDataChange}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group2"
                            checked={formData.radioGroup === "group2"}
                            label="กลุ่ม 2"
                            onChange={onFormDataChange}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group3"
                            checked={formData.radioGroup === "group3"}
                            label="กลุ่ม 3"
                            onChange={onFormDataChange}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group4"
                            checked={formData.radioGroup === "group4"}
                            label="กลุ่ม อื่นๆ................................................."
                            onChange={onFormDataChange}
                            inline
                        />
                        &nbsp;&nbsp;<label>Email-อาจารย์ที่ปรึกษา</label>
                        &nbsp;&nbsp;
                        <MDBInput background type="text3" id="Email" />
                    </div>

                    <div className="input">
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.
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
                        <label>&nbsp;6. อาจารย์ที่ปรึกษา</label>
                        <MDBCheckbox
                            name="checkGroup6"
                            value={formData.checkGroup6}
                            checked={formData.checkGroup6}
                            onChange={onFormDataChange}
                            label="เเต่งตั้ง"
                            inline
                        />
                        <label>อาจารย์ที่ปรึกษา(หลัก)</label>
                        <MDBInput
                            name="teacher1"
                            type="text2"
                            id="teacher1"
                            value={formData.teacher1}
                            onChange={onFormDataChange}
                        />

                        <label>อาจารย์ที่ปรึกษา(ร่วม)</label>
                        <MDBInput
                            name="teacher2"
                            id="teacher2"
                            type="text2"
                            value={formData.teacher2}
                            onChange={onFormDataChange}
                        />
                    </div>
                    <label>
                        &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;7.
                        รับรองการเสนอหัวข้อโคงงานฯ
                        เเละการเเต่งตั้งอาจารย์ที่ปรึกษา
                    </label>
                    <div className="input">
                        <label>1. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            name="student1"
                            id="student1"
                            type="text"
                            value={formData.student1}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>2. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            name="student2"
                            id="student2"
                            type="text"
                            value={formData.student2}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>3. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            name="student3"
                            id="student3"
                            type="text"
                            value={formData.student3}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
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

export default Docx1;
