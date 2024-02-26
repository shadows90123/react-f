import { useState, useEffect } from "react";
import HeaderStudent from "../../components/Student/Header";
import "./Document1.css";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    getTeachers,
    createRequestSig,
    getDocumentByUserId,
    getDocReq,
} from "../../libs/Firebase";

const Document1 = () => {
    const [user] = useAuthState(auth);

    const [showReqSig, setShowReqSig] = useState(false);
    const handleClose = () => setShowReqSig(false);
    const handleShow = () => setShowReqSig(true);

    const [teachers, setTeachers] = useState({});
    const [teacherSelect, setTeacherSelect] = useState("");

    const onSelectTeacherChange = (e) => {
        setTeacherSelect(e.target.value);
    };

    const onSubmitReqSig = async () => {
        if (teacherSelect === "") {
            alert("กรุณาเลือกอาจารย์ที่ปรึกษา");
            return;
        }

        const [docId, docData] = await getDocumentByUserId(
            user.uid,
            "document_1"
        );

        if (await isAlreadyRequest(user.uid, "document_1", docId)) {
            await createRequestSig(
                user.uid,
                "document_1",
                docId,
                teacherSelect
            );
            alert("ยื่นขอลายเซ็นสำเร็จ");
        } else {
            alert("ไม่สามารถยื่นขอลายเซ็นซ้ำได้");
        }

        setShowReqSig(false);
    };

    const isAlreadyRequest = async (uid, docType, docId) => {
        const data = await getDocReq(uid, docType, docId);
        return !Object.keys(data).length;
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            const t = await getTeachers();
            setTeachers(t);
        };
        fetchTeachers();
    }, []);

    return (
        <div>
            <HeaderStudent />
            <br></br>
            <br></br>
            <hr></hr>
            <div className="DocDetails">
                <button class="button1 button2 ">
                    <Link
                        to="create"
                        className="text-white  text-decoration-none"
                    >
                        กรอกเอกสารป.1
                    </Link>
                </button>
                <button class="button1 button2">
                    <Link
                        to="edit"
                        className="text-white  text-decoration-none"
                    >
                        เเก้ไขเอกสารป.1
                    </Link>
                </button>
                <button class="button1 button2" onClick={handleShow}>
                    ยื่นขอลายเซ็น
                </button>
                <button class="button1 button2">Download</button>
            </div>

            <Modal show={showReqSig} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>ยื่นขอลายเซ็น</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>อาจารย์ที่ปรึกษา</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={onSelectTeacherChange}
                            value={teacherSelect}
                        >
                            <option value="">เลือกอาจารย์ที่ปรึกษา</option>
                            {Object.keys(teachers).map((t) => {
                                return (
                                    <option value={t}>
                                        {teachers[t].email}
                                    </option>
                                );
                            })}
                            {/* <option>เลือกอาจารย์ที่ปรึกษา</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" onClick={onSubmitReqSig}>
                        ตกลง
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Document1;
