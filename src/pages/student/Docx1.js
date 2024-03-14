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
    addNewDocument,
    updateDocumentById,
    getDocumentByUserId,
} from "../../libs/Firebase";
import { Form } from "react-bootstrap";

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
            <div className=" p-5">
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
                        กรอกเอกสาร ป.1
                    </div>

                    <div className=" d-flex justify-content-evenly p-3  ">
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
                    <Form>
                        <div className="d-flex justify-content-evenly col- p-3 ">
                            <label className="p-1"> 1. ชื่อ-สกุล </label>
                            <MDBInput
                                className="w-auto "
                                size="sm"
                                background
                                type="text"
                                id="name1"
                                name="name1"
                                value={formData.name1}
                                onChange={onFormDataChange}
                            />
                            <label className="p-1"> รหัสนักศึกษา </label>
                            <MDBInput
                                className="w-auto  "
                                type="text"
                                id="pass1"
                                name="pass1"
                                size="sm"
                                value={formData.pass1}
                                onChange={onFormDataChange}
                            />
                            <label className="p-1">เบอร์โทรติดต่อ </label>
                            <MDBInput
                                className="w-auto  "
                                id="number1"
                                name="number1"
                                type="text"
                                size="sm"
                                value={formData.number1}
                                onChange={onFormDataChange}
                            />
                        </div>
                    </Form>

                    <div className="d-flex justify-content-evenly col- p-3 ">
                        <label className="p-1">2. ชื่อ-สกุล</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="name2"
                            id="name2"
                            type="text"
                            value={formData.name2}
                            onChange={onFormDataChange}
                        />

                        <label className="p-1">รหัสนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="pass2"
                            id="pass2"
                            type="text"
                            value={formData.pass2}
                            onChange={onFormDataChange}
                        />

                        <label className="p-1">เบอร์โทรติดต่อ</label>
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

                    <div className="d-flex justify-content-evenly col- p-3  ">
                        <label className="p-1">3. ชื่อ-สกุล</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="name3"
                            id="name3"
                            type="text"
                            value={formData.name3}
                            onChange={onFormDataChange}
                        />
                        <label className="p-1">รหัสนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="pass3"
                            id="pass3"
                            type="text"
                            value={formData.pass3}
                            onChange={onFormDataChange}
                        />
                        <label className="p-1">เบอร์โทรติดต่อ</label>
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

                    <div className="d-flex justify-content-evenly col- p-3">
                        <label> ลงทะเบียนเรียน </label>
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
                        <label className="col-">อาจารย์ที่ปรึกษา</label>
                        <MDBCheckbox
                            name="checkGroup6"
                            value={formData.checkGroup6}
                            checked={formData.checkGroup6}
                            onChange={onFormDataChange}
                            label="เเต่งตั้ง"
                            inline
                        />
                    </div>

                    <div className="d-flex justify-content-evenly col- p-3 ">
                        <label className="col-">หัวข้อโครงงาน</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="project"
                            id="project"
                            type="text"
                            value={formData.project}
                            onChange={onFormDataChange}
                        />
                        <label className="col-">อาจารย์ที่ปรึกษา(หลัก)</label>
                        <MDBInput
                            className="w-auto"
                            size="sm"
                            name="teacher1"
                            type="text"
                            id="teacher1"
                            value={formData.teacher1}
                            onChange={onFormDataChange}
                        />
                        <label className="col-">อาจารย์ที่ปรึกษา(ร่วม)</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="teacher2"
                            id="teacher2"
                            type="text"
                            value={formData.teacher2}
                            onChange={onFormDataChange}
                        />
                    </div>
                    <div className="d-flex justify-content-evenly col- p-3 ">
                        <label>1. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            size="sm"
                            className="w-auto"
                            name="student1"
                            id="student1"
                            type="text"
                            value={formData.student1}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>2. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            size="sm"
                            className="w-auto"
                            name="student2"
                            id="student2"
                            type="text"
                            value={formData.student2}
                            onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>3. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            size="sm"
                            className="w-auto"
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
