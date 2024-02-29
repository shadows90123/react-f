import HeaderStudent from "../../components/Student/Header";
import { MDBInput } from "mdbreact";
import { MDBCheckbox, MDBRadio } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
    auth,
    addNewDocument,
    updateDocumentById,
    getDocumentByUserId,
} from "../../libs/Firebase";

const Docx2 = ({ action }) => {
    const navigate = useNavigate();
    const [_action] = useState(action);
    const [user] = useAuthState(auth);
    const [documentType] = useState("document_2");
    const [docId, setDocId] = useState(null);

    const [formData, setFromData] = useState({
        checkGroup1: false,
        checkGroup2: false,
        checkGroup3: false,
        checkGroup4: false,
        checkGroup5: false,
        checkGroup6: false,
        checkGroup7: false,
        checkGroup8: false,
        checkGroup9: false,
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
        student: "",
        sec: "",
        year: "",
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
            <div className="from">
                <div className="frame-2">
                    <div className="title"> กรอกเอกสาร ป.2</div>
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

                    <div className="formcheck-1">
                        <label>1.บัดนี้ ได้ดำเนินการจัดทำโครงงานวิศวกรรม</label>
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup6"
                            value={formData.checkGroup6}
                            checked={formData.checkGroup6}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;โครงงานฯ 1"
                        />
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup7"
                            value={formData.checkGroup7}
                            checked={formData.checkGroup7}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;โครงงานฯ 2"
                        />
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <label>2.มีความประสงค์ขอสอบ</label>
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup8"
                            value={formData.checkGroup8}
                            checked={formData.checkGroup8}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;ความก้าวหน้า"
                        />
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup9"
                            value={formData.checkGroup9}
                            checked={formData.checkGroup9}
                            onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;ปริญญานิพนธ์ขั้นทุดท้าย"
                        />
                        &nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="input">
                        <label>3. ชื่อ-สกุล&nbsp;</label>
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
                        <label>4. ชื่อ-สกุล&nbsp;</label>
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
                        <label>5. ชื่อ-สกุล&nbsp;</label>
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
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.
                            เสนอหัวข้อโครงงาน&nbsp;
                        </label>
                        <MDBInput
                            name="project"
                            type="text"
                            value={formData.project}
                            onChange={onFormDataChange}
                        />
                        &nbsp; &nbsp;
                    </div>
                    <div className="input">
                        <label>7.ลงชื่อนักศึกษา</label>
                        <MDBInput
                            name="student"
                            type="text"
                            value={formData.student}
                            onChange={onFormDataChange}
                        />
                        &nbsp;<label>ภาคเรียนที่ &nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            name="sec"
                            value={formData.sec}
                            onChange={onFormDataChange}
                        />
                        &nbsp;<label>ปีการศึกษา &nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            name="year"
                            value={formData.year}
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

export default Docx2;
