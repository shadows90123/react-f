import "./Docx1.css";
import { MDBInput } from "mdbreact";
import { MDBCheckbox, MDBRadio } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Header from "../../components/Teacher/Header";
import SignatureCanvas from "react-signature-canvas";
import "./signture.css";
import { useState, useEffect } from "react";

import {
    updateDocumentById,
    uploadToStorage,
    getFromStorage,
    getDocumentById,
} from "../../libs/Firebase";
import { useParams, useNavigate } from "react-router-dom";

const DocDetails1 = () => {
    let { reqId } = useParams();
    const navigate = useNavigate();

    const [reqData, setReqData] = useState({});

    const [signCanvas, setSignCanvas] = useState("");
    const [url, setUrl] = useState("");
    const [data, setData] = useState("");
    const handleClear = () => {
        signCanvas.clear();
    };

    // ใช้งาน
    const handleSave = async () => {
        // setUrl(signCanvas.getTrimmedCanvas().toDataURL("signCanvas"));
        const uploaded = await uploadToStorage(
            signCanvas.getTrimmedCanvas().toDataURL("signCanvas")
        );

        const sigPath = uploaded?.metadata.fullPath;
        await updateDocumentById("document_request", {
            id: reqId,
            data: {
                signature: sigPath,
                verify_state: true,
                updated_at: new Date(),
            },
        });

        await updateDocumentById("document_lists", {
            id: reqData.list_id,
            data: {
                verify_state: true,
                updated_at: new Date(),
            },
        });

        alert("Success!!");
        navigate("/teacher/document_1");
    };

    const [formData, setFromData] = useState({
        checkGroup1: false,
        checkGroup2: false,
        checkGroup3: false,
        checkGroup4: false,
        checkGroup5: false,
        radioGroup: "group1",
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
    });

    useEffect(() => {
        const fetchDocument = async () => {
            const _reqData = await getDocumentById("document_request", reqId);
            setReqData(_reqData);

            const _docData = await getDocumentById(
                "documents",
                _reqData.doc_id
            );
            setReqData(_reqData);
            setFromData(_docData);
        };

        fetchDocument();
    }, [reqId]);

    return (
        <div>
            <Header />
            <div className="from">
                <div className="frame">
                    <div className="title">กรอกเอกสาร ป.1</div>
                    <div className="formcheck">
                        <MDBCheckbox
                            name="checkGroup1"
                            id="flexCheckDefault"
                            label="&nbsp;โยธา"
                            disabled
                            value={formData.checkGroup1}
                            checked={formData.checkGroup1}
                        />
                        <MDBCheckbox
                            name="checkGroup2"
                            id="flexCheckDefault"
                            label="&nbsp;อุสาหการ"
                            disabled
                            value={formData.checkGroup2}
                            checked={formData.checkGroup2}
                        />
                        <MDBCheckbox
                            name="checkGroup3"
                            id="flexCheckDefault"
                            label="&nbsp;สิ่งเเวดล้อม"
                            disabled
                            value={formData.checkGroup3}
                            checked={formData.checkGroup3}
                        />
                        <MDBCheckbox
                            name="checkGroup4"
                            id="flexCheckDefault"
                            label="&nbsp;คอมพิวเตอร์"
                            disabled
                            value={formData.checkGroup4}
                            checked={formData.checkGroup4}
                        />
                        <MDBCheckbox
                            name="checkGroup5"
                            id="flexCheckDefault"
                            label="&nbsp;พลังงาน"
                            disabled
                            value={formData.checkGroup5}
                            checked={formData.checkGroup5}
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
                            disabled
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="pass1"
                            name="pass1"
                            value={formData.pass1}
                            disabled
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            background
                            id="number1"
                            name="number1"
                            type="text"
                            value={formData.number1}
                            disabled
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
                            disabled
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            name="pass2"
                            id="pass2"
                            type="text"
                            value={formData.pass2}
                            disabled
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            name="number2"
                            id="number2"
                            type="text"
                            value={formData.number2}
                            disabled
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
                            disabled
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            name="pass3"
                            id="pass3"
                            type="text"
                            value={formData.pass3}
                            disabled
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            name="number3"
                            id="number3"
                            type="text"
                            value={formData.number3}
                            disabled
                        />
                        &nbsp;
                    </div>

                    <div className="changeradio">
                        <label>4. ลงทะเบียนเรียน </label>
                        <MDBRadio
                            name="radioGroup"
                            value="group1"
                            label="กลุ่ม 1"
                            inline
                            disabled
                            checked={formData.radioGroup === "group1"}
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group2"
                            label="กลุ่ม 2"
                            inline
                            disabled
                            checked={formData.radioGroup === "group2"}
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group3"
                            label="กลุ่ม 3"
                            inline
                            disabled
                            checked={formData.radioGroup === "group3"}
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group4"
                            label="กลุ่ม อื่นๆ................................................."
                            inline
                            disabled
                            checked={formData.radioGroup === "group4"}
                        />
                        &nbsp;&nbsp;<label>ลายเซ็นอาจารย์ที่ปรึกษา</label>
                        <div className="signture">
                            <SignatureCanvas
                                penColor="black"
                                canvasProps={{
                                    width: 220,
                                    height: 50,
                                    className: "sigCanvas",
                                }}
                                ref={(data) => setSignCanvas(data)}
                            />
                        </div>
                        <Button
                            variant="success"
                            className="button-0"
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
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
                            disabled
                        />
                        &nbsp; &nbsp;
                    </div>
                    <div className="input">
                        <label>&nbsp;6. อาจารย์ที่ปรึกษา</label>
                        <MDBCheckbox
                            name="checkGroup6"
                            label="เเต่งตั้ง"
                            inline
                            value={formData.checkGroup6}
                            disabled
                        />
                        <label>อาจารย์ที่ปรึกษา(หลัก)</label>
                        <MDBInput
                            name="teacher1"
                            type="text2"
                            id="teacher1"
                            value={formData.teacher1}
                            disabled
                        />

                        <label>อาจารย์ที่ปรึกษา(ร่วม)</label>
                        <MDBInput
                            name="teacher2"
                            id="teacher2"
                            type="text2"
                            value={formData.teacher2}
                            disabled
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
                            disabled
                        />
                        &nbsp;
                        <label>2. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            name="student2"
                            id="student2"
                            type="text"
                            value={formData.student2}
                            disabled
                        />
                        &nbsp;
                        <label>3. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            name="student3"
                            id="student3"
                            type="text"
                            value={formData.student3}
                            disabled
                        />
                        &nbsp;
                    </div>
                    <div className="button">
                        <div>
                            <Button
                                variant="success"
                                className="button-1"
                                onClick={handleSave}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocDetails1;
