import "./Docx1.css";
import { MDBInput } from "mdbreact";
import { MDBCheckbox, MDBRadio } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Header from "../../components/Teacher/Header";
import SignatureCanvas from "react-signature-canvas";
import "./signture.css";
import { useState, useEffect } from "react";

import { uploadToStorage, getDocumentById } from "../../libs/Firebase";
import { useParams } from "react-router-dom";

const DocDetails1 = () => {
    let { reqId } = useParams();

    const [signCanvas, setSignCanvas] = useState("");
    const [url, setUrl] = useState("");
    const [data, setData] = useState("");
    const handleClear = () => {
        signCanvas.clear();
    };

    // ใช้งาน
    const handleSave = () => {
        setUrl(signCanvas.getTrimmedCanvas().toDataURL("signCanvas"));
        uploadToStorage(signCanvas.getTrimmedCanvas().toDataURL("signCanvas"));
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
            await getDocumentById();
        };
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
                        />
                        <MDBCheckbox
                            name="checkGroup2"
                            id="flexCheckDefault"
                            label="&nbsp;อุสาหการ"
                        />
                        <MDBCheckbox
                            name="checkGroup3"
                            id="flexCheckDefault"
                            label="&nbsp;สิ่งเเวดล้อม"
                        />
                        <MDBCheckbox
                            name="checkGroup4"
                            id="flexCheckDefault"
                            label="&nbsp;คอมพิวเตอร์"
                        />
                        <MDBCheckbox
                            name="checkGroup5"
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
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="pass1"
                            name="pass1"
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            background
                            id="number1"
                            name="number1"
                            type="text"
                        />
                        &nbsp;
                    </div>
                    <div className="input">
                        <label>2. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput name="name2" id="name2" type="text" />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput name="pass2" id="pass2" type="text" />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput name="number2" id="number2" type="text" />
                        &nbsp;
                    </div>
                    <div className="input">
                        <label>3. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput name="name3" id="name3" type="text" />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput name="pass3" id="pass3" type="text" />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput name="number3" id="number3" type="text" />
                        &nbsp;
                    </div>

                    <div className="changeradio">
                        <label>4. ลงทะเบียนเรียน </label>
                        <MDBRadio
                            name="radioGroup"
                            value="group1"
                            label="กลุ่ม 1"
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group2"
                            label="กลุ่ม 2"
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group3"
                            label="กลุ่ม 3"
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group4"
                            label="กลุ่ม อื่นๆ................................................."
                            inline
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
                        <MDBInput name="project" id="project" type="text1" />
                        &nbsp; &nbsp;
                    </div>
                    <div className="input">
                        <label>&nbsp;6. อาจารย์ที่ปรึกษา</label>
                        <MDBCheckbox
                            name="checkGroup6"
                            label="เเต่งตั้ง"
                            inline
                        />
                        <label>อาจารย์ที่ปรึกษา(หลัก)</label>
                        <MDBInput name="teacher1" type="text2" id="teacher1" />

                        <label>อาจารย์ที่ปรึกษา(ร่วม)</label>
                        <MDBInput name="teacher2" id="teacher2" type="text2" />
                    </div>
                    <label>
                        &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;7.
                        รับรองการเสนอหัวข้อโคงงานฯ
                        เเละการเเต่งตั้งอาจารย์ที่ปรึกษา
                    </label>
                    <div className="input">
                        <label>1. ลงชื่อนักศึกษา</label>
                        <MDBInput name="student1" id="student1" type="text" />
                        &nbsp;
                        <label>2. ลงชื่อนักศึกษา</label>
                        <MDBInput name="student2" id="student2" type="text" />
                        &nbsp;
                        <label>3. ลงชื่อนักศึกษา</label>
                        <MDBInput name="student3" id="student3" type="text" />
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
