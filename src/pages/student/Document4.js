import { useState, useEffect } from "react";
import HeaderStudent from "../../components/Student/Header";
import "./Document1.css";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import CreatePDF4 from "../../components/CreatePDF4";

import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    addNewDocument,
    updateDocumentById,
    getTeachers,
    getDocumentByUserId,
    getDocReq,
    getSignatureById,
    getFromStorage,
} from "../../libs/Firebase";

const Document4 = () => {
    const [user] = useAuthState(auth);

    const [showReqSig, setShowReqSig] = useState(false);
    const handleClose = () => setShowReqSig(false);
    const handleShow = () => setShowReqSig(true);

    const [teachers, setTeachers] = useState({});
    const [teacherSelect, setTeacherSelect] = useState("");

    const [data, setData] = useState(null);
    const [sigUrl, setSigUrl] = useState(null);

    const onSelectTeacherChange = (e) => {
        setTeacherSelect(e.target.value);
    };

    const onSubmitReqSig = async () => {
        if (teacherSelect === "") {
            alert("กรุณาเลือกอาจารย์ที่ปรึกษา");
            return;
        }

        const [listId, docId, docData] = await getDocumentByUserId(
            user.uid,
            "document_4"
        );

        if (await isAlreadyRequest(user.uid, "document_4", docId)) {
            await updateDocumentById("document_lists", {
                id: listId,
                data: {
                    request_state: true,
                    updated_at: new Date(),
                },
            });
            await addNewDocument("document_request", {
                student_uid: user.uid,
                doc_type: "document_4",
                doc_id: docId,
                list_id: listId,
                teacher_id: teacherSelect,
                verify_state: false,
                created_at: new Date(),
                updated_at: new Date(),
                signature: null,
            });
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

        const fetchDocument = async () => {
            const [listId, docId, docData] = await getDocumentByUserId(
                user.uid,
                "document_4"
            );

            const reqData = await getSignatureById(docId);
            // const newUrl = await getFromStorage(reqData);
            setData(docData);
            // setSigUrl(newUrl);
        };
        fetchTeachers();
        fetchDocument();
    }, [user]);

    return (
        <div>
            <HeaderStudent />
            <br></br>
            <br></br>
            <hr></hr>
            <div className="DocDetails">
                <button class="button1 button2">
                    <Link
                        to="create"
                        className="text-white  text-decoration-none"
                    >
                        กรอกเอกสารป.4
                    </Link>
                </button>
                <button class="button1 button2">
                    <Link
                        to="edit"
                        className="text-white  text-decoration-none"
                    >
                        เเก้ไขเอกสารป.4
                    </Link>
                </button>
                <button class="button1 button2" onClick={handleShow}>
                    ยื่นขอลายเซ็น
                </button>
                <CreatePDF4 docData={data} sigLink={sigUrl} />
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

export default Document4;
