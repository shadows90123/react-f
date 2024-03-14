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
                    <div className="d-flex justify-content-center col- p-3  ">
                        <label className="p-1">เสนอหัวข้อโครงงาน</label>
                        <MDBInput
                            style={{ width: 500 }}
                            size="sm"
                            name="project"
                            id="project"
                            type="text"
                            value={formData.project}
                            disabled
                        />
                    </div>
                    <div className=" d-flex justify-content-evenly p-3">
                        <MDBCheckbox
                            name="checkGroup1"
                            id="flexCheckDefault"
                            label="โยธา"
                            disabled
                            value={formData.checkGroup1}
                            checked={formData.checkGroup1}
                        />
                        <MDBCheckbox
                            name="checkGroup2"
                            id="flexCheckDefault"
                            label="อุสาหการ"
                            disabled
                            value={formData.checkGroup2}
                            checked={formData.checkGroup2}
                        />
                        <MDBCheckbox
                            name="checkGroup3"
                            id="flexCheckDefault"
                            label="สิ่งเเวดล้อม"
                            disabled
                            value={formData.checkGroup3}
                            checked={formData.checkGroup3}
                        />
                        <MDBCheckbox
                            name="checkGroup4"
                            id="flexCheckDefault"
                            label="คอมพิวเตอร์"
                            disabled
                            value={formData.checkGroup4}
                            checked={formData.checkGroup4}
                        />
                        <MDBCheckbox
                            name="checkGroup5"
                            id="flexCheckDefault"
                            label="พลังงาน"
                            disabled
                            value={formData.checkGroup5}
                            checked={formData.checkGroup5}
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
                            disabled
                        />

                        <label>รหัสนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            type="text"
                            id="pass1"
                            name="pass1"
                            value={formData.pass1}
                            disabled
                        />

                        <label>เบอร์โทรติดต่อ</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            background
                            id="number1"
                            name="number1"
                            type="text"
                            value={formData.number1}
                            disabled
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
                            disabled
                        />

                        <label>รหัสนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="pass2"
                            id="pass2"
                            type="text"
                            value={formData.pass2}
                            disabled
                        />

                        <label>เบอร์โทรติดต่อ</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="number2"
                            id="number2"
                            type="text"
                            value={formData.number2}
                            disabled
                        />
                    </div>
                    <div className="d-flex justify-content-evenly col- p-3">
                        <label>3. ชื่อ-สกุล</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="name3"
                            id="name3"
                            type="text"
                            value={formData.name3}
                            disabled
                        />

                        <label>รหัสนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="pass3"
                            id="pass3"
                            type="text"
                            value={formData.pass3}
                            disabled
                        />

                        <label>เบอร์โทรติดต่อ</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="number3"
                            id="number3"
                            type="text"
                            value={formData.number3}
                            disabled
                        />
                    </div>

                    <div className="d-flex justify-content-evenly col- p-3">
                        <label>ลงทะเบียนเรียน </label>
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
                        <label>ลายเซ็นอาจารย์ที่ปรึกษา</label>
                        <div
                            style={{
                                border: "0.5px solid black ",
                            }}
                        >
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

                    <div className="d-flex justify-content-evenly col- p-3">
                        <label>อาจารย์ที่ปรึกษา</label>
                        <MDBCheckbox
                            name="checkGroup6"
                            label="เเต่งตั้ง"
                            inline
                            value={formData.checkGroup6}
                            disabled
                        />
                        <label>อาจารย์ที่ปรึกษา(หลัก)</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="teacher1"
                            type="text2"
                            id="teacher1"
                            value={formData.teacher1}
                            disabled
                        />

                        <label>อาจารย์ที่ปรึกษา(ร่วม)</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="teacher2"
                            id="teacher2"
                            type="text2"
                            value={formData.teacher2}
                            disabled
                        />
                    </div>
                    <div className="d-flex justify-content-evenly col- p-3">
                        <label>1. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="student1"
                            id="student1"
                            type="text"
                            value={formData.student1}
                            disabled
                        />

                        <label>2. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="student2"
                            id="student2"
                            type="text"
                            value={formData.student2}
                            disabled
                        />

                        <label>3. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="student3"
                            id="student3"
                            type="text"
                            value={formData.student3}
                            disabled
                        />
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
