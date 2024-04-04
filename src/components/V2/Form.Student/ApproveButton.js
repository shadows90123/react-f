import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { GetAllDocument, UpdateDocument } from "../../../libs/Firebase";

export default function ApproveButton({ disabled, docMeta, onReloadPage }) {
    const [modalShow, setModalShow] = useState(false);
    const [_docs, setDocs] = useState({});
    const [allTeacher, setAllTeacher] = useState({});
    const [formData, setFormData] = useState({});

    const onChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? !formData[name] : value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const docId = _.keys(_docs)[0] ?? false;
        const docVal = _.values(_docs)[0];

        if (!docId) {
            toast.error("เกิดข้อผิดพลาด: ไม่พบข้อมูลเอกสาร");
            return;
        }

        if (docVal.approved["teacher"].state !== "unsubmitted") {
            toast.error("เกิดข้อผิดพลาด: ไม่สามารถยื่นขอลายเซ็นซ้ำได้");
            return;
        }

        if (formData?.teacher === "" || formData?.teacher === undefined) {
            toast.error("เกิดข้อผิดพลาด: ไม่ได้เลือกอาจารย์");
            return;
        }

        try {
            await UpdateDocument("documents", docId, {
                updated_at: new Date().toJSON(),
                "approved.teacher.state": "submitted",
                "approved.teacher.teacher_id": formData?.teacher,
                "approved.teacher.created_at": new Date().toJSON(),
                "approved.teacher.updated_at": new Date().toJSON(),
            });

            toast.success("ยื่นขอลายเซ็นสำเร็จ");
            onHide();
            onReloadPage();
        } catch (error) {
            toast.error(`เกิดข้อผิดพลาด : ${error.message}`);
        }
    };

    const onHide = () => {
        setModalShow(false);
    };

    useEffect(() => {
        if (!_.isEmpty(docMeta)) {
            setDocs(docMeta);
        }
    }, [docMeta]);

    useEffect(() => {
        const fetchUsers = async () => {
            const ref = await GetAllDocument("users");

            let _teachers = {};
            _.keys(ref).map((key) => {
                if (ref[key].user_type === "teacher") {
                    _teachers = { ..._teachers, [key]: ref[key] };
                }
            });
            setAllTeacher(_teachers);
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Button
                variant="primary"
                className="m-1"
                onClick={() => setModalShow(true)}
                disabled={!disabled}
            >
                ยื่นขอลายเซ็น
            </Button>
            <Modal
                onHide={onHide}
                show={modalShow}
                size="md"
                aria-labelledby="contained-modal-document1-approve"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-document1-approve">
                        ยื่นขอลายเซ็น เอกสาร ป.1
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={onChange}
                                    name="teacher"
                                    value={formData?.teacher}
                                >
                                    <option value="">เลือกอาจารย์</option>
                                    {_.keys(allTeacher).map((key) => {
                                        return (
                                            <option key={key} value={key}>
                                                {allTeacher[key].email}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        ยื่นขอลายเซ็น
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
