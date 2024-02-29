import { MDBInput } from "mdbreact";
import { MDBCheckbox, MDBRadio } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import SignatureCanvas from "react-signature-canvas";
import "./signture.css";
import { useState, useEffect } from "react";
import Header from "../../components/Teacher/Header";

import {
    updateDocumentById,
    uploadToStorage,
    getFromStorage,
    getDocumentById,
} from "../../libs/Firebase";
import { useParams, useNavigate } from "react-router-dom";

const DocDetails3 = () => {
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
        navigate("/teacher/document_3");
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
                <div className="frame-1">
                    <div className="title"> กรอกเอกสาร ป.3</div>
                    <div className="formcheck">
                        <MDBCheckbox
                            name="checkGroup1"
                            value={formData.checkGroup1}
                            checked={formData.checkGroup1}
                            id="flexCheckDefault"
                            disabled
                            label="&nbsp;โยธา"
                        />
                        <MDBCheckbox
                            name="checkGroup2"
                            value={formData.checkGroup2}
                            checked={formData.checkGroup2}
                            id="flexCheckDefault"
                            disabled
                            label="&nbsp;อุสาหการ"
                        />
                        <MDBCheckbox
                            name="checkGroup3"
                            value={formData.checkGroup3}
                            checked={formData.checkGroup3}
                            id="flexCheckDefault"
                            disabled
                            label="&nbsp;สิ่งเเวดล้อม"
                        />
                        <MDBCheckbox
                            name="checkGroup4"
                            value={formData.checkGroup4}
                            checked={formData.checkGroup4}
                            id="flexCheckDefault"
                            disabled
                            label="&nbsp;คอมพิวเตอร์"
                        />
                        <MDBCheckbox
                            name="checkGroup5"
                            value={formData.checkGroup5}
                            checked={formData.checkGroup5}
                            id="flexCheckDefault"
                            disabled
                            label="&nbsp;พลังงาน"
                        />
                    </div>

                    <div className="changeradio1">
                        <label>1. ลงทะเบียนเรียน </label>
                        <MDBRadio
                            name="radioGroup"
                            value="group1"
                            label="กลุ่ม 1"
                            disabled
                            checked={formData.radioGroup === "group1"}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group2"
                            label="กลุ่ม 2"
                            disabled
                            checked={formData.radioGroup === "group2"}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group3"
                            label="กลุ่ม 3"
                            disabled
                            checked={formData.radioGroup === "group3"}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group4"
                            label="กลุ่ม อื่นๆ................................................."
                            disabled
                            checked={formData.radioGroup === "group4"}
                            inline
                        />
                    </div>
                    <div className="input">
                        <label>2. ชื่อ-สกุล&nbsp;</label>
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
                        <label>3. ชื่อ-สกุล&nbsp;</label>
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
                        <label>4. ชื่อ-สกุล&nbsp;</label>
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

                    <div className="input-2">
                        <label>6. เสนอหัวข้อโครงงาน&nbsp;</label>
                        <MDBInput
                            name="project"
                            id="project"
                            type="text4"
                            value={formData.project}
                            disabled
                        />
                        &nbsp; &nbsp; &nbsp;&nbsp;
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

export default DocDetails3;
