import { MDBInput } from "mdbreact";
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

const DocDetails4 = () => {
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
        navigate("/teacher/document_4");
    };
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
                        <label>4. เสนอหัวข้อโครงงาน</label>
                        <MDBInput
                            style={{ width: 350 }}
                            size="sm"
                            name="project"
                            id="project"
                            type="text4"
                            value={formData.project}
                            disabled
                        />
                        <label>ลายเซ็นอาจารย์ที่ปรึกษา</label>
                        <div
                            style={{
                                border: "0.5px solid black ",
                            }}
                        >
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
                    <div className="d-flex justify-content-evenly col- p-3">
                        <label>5.สาขาวิชา</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="fieldofstudy"
                            id="fieldofstudy"
                            type="text"
                            value={formData.major}
                            disabled
                        />

                        <label>จำนวนเงิน</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="money"
                            id="money"
                            type="text"
                            value={formData.money}
                            disabled
                        />
                        <label>จำนวนเงินภาษาไทย</label>
                        <MDBInput
                            className="w-auto "
                            size="sm"
                            name="money1"
                            id="money1"
                            type="text"
                            value={formData.money1}
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

export default DocDetails4;
