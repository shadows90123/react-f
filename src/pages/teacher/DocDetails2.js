import { MDBInput } from "mdbreact";
import { MDBCheckbox } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import SignatureCanvas from "react-signature-canvas";
import "./signture.css";
import Header from "../../components/Teacher/Header";
import { useState, useEffect } from "react";

import {
    updateDocumentById,
    uploadToStorage,
    getFromStorage,
    getDocumentById,
} from "../../libs/Firebase";
import { useParams, useNavigate } from "react-router-dom";

const DocDetails2 = () => {
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
        navigate("/teacher/document_2");
    };

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
                <div className="frame-2">
                    <div className="title"> กรอกเอกสาร ป.2</div>
                    <div className="formcheck">
                        <MDBCheckbox
                            name="checkGroup1"
                            disabled
                            value={formData.checkGroup1}
                            checked={formData.checkGroup1}
                            id="flexCheckDefault"
                            label="&nbsp;โยธา"
                        />
                        <MDBCheckbox
                            name="checkGroup2"
                            disabled
                            value={formData.checkGroup2}
                            checked={formData.checkGroup2}
                            id="flexCheckDefault"
                            label="&nbsp;อุสาหการ"
                        />
                        <MDBCheckbox
                            name="checkGroup3"
                            disabled
                            value={formData.checkGroup3}
                            checked={formData.checkGroup3}
                            id="flexCheckDefault"
                            label="&nbsp;สิ่งเเวดล้อม"
                        />
                        <MDBCheckbox
                            name="checkGroup4"
                            disabled
                            value={formData.checkGroup4}
                            checked={formData.checkGroup4}
                            id="flexCheckDefault"
                            label="&nbsp;คอมพิวเตอร์"
                        />
                        <MDBCheckbox
                            name="checkGroup5"
                            disabled
                            value={formData.checkGroup5}
                            checked={formData.checkGroup5}
                            id="flexCheckDefault"
                            label="&nbsp;พลังงาน"
                        />
                    </div>
                    <div className="formcheck-1">
                        <label>1.บัดนี้ ได้ดำเนินการจัดทำโครงงานวิศวกรรม</label>
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup6"
                            disabled
                            value={formData.checkGroup6}
                            checked={formData.checkGroup6}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;โครงงานฯ 1"
                        />
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup7"
                            disabled
                            value={formData.checkGroup7}
                            checked={formData.checkGroup7}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;โครงงานฯ 2"
                        />
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <label>2.มีความประสงค์ขอสอบ</label>
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup8"
                            disabled
                            value={formData.checkGroup8}
                            checked={formData.checkGroup8}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;ความก้าวหน้า"
                        />
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup9"
                            disabled
                            value={formData.checkGroup9}
                            checked={formData.checkGroup9}
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
                        <label>4. ชื่อ-สกุล&nbsp;</label>
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
                        <label>5. ชื่อ-สกุล&nbsp;</label>
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
                    <div className="input-1">
                        <label>6. เสนอหัวข้อโครงงาน</label>
                        <MDBInput
                            name="project"
                            id="project"
                            type="text4"
                            value={formData.project}
                            disabled
                        />
                        <label>ลายเซ็นอาจารย์ที่ปรึกษา</label>&nbsp; &nbsp;
                        <div className="signture">
                            {" "}
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
                        <label>7.ลงชื่อนักศึกษา</label>&nbsp; &nbsp;
                        <MDBInput
                            name="student"
                            id="student"
                            type="text"
                            value={formData.student}
                            disabled
                        />
                        &nbsp;<label>ภาคเรียนที่ &nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="sec"
                            name="sec"
                            value={formData.sec}
                            disabled
                        />
                        &nbsp;<label>ปีการศึกษา &nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="year"
                            name="year"
                            value={formData.year}
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

export default DocDetails2;
