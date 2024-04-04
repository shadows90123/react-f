import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { DeleteDocument } from "../../../libs/Firebase";

export default function DeleteButton({ disabled, docMeta, onReloadPage }) {
    const [modalShow, setModalShow] = useState(false);
    const [_docs, setDocs] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();

        const docId = _.keys(_docs)[0] ?? false;

        if (!docId) {
            toast.error("เกิดข้อผิดพลาด: ไม่พบข้อมูลเอกสาร");
            return;
        }

        try {
            await DeleteDocument("documents", docId);

            toast.success("ลบเอกสารสำเร็จ");
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

    return (
        <>
            <Button
                variant="primary"
                className="m-1"
                onClick={() => setModalShow(true)}
                disabled={!disabled}
            >
                ลบเอกสาร
            </Button>
            <Modal
                onHide={onHide}
                show={modalShow}
                size="md"
                aria-labelledby="contained-modal-document1-delete"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-document1-delete">
                        ลบเอกสาร ป.1
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>ยืนยันการลบเอกสาร ป.1</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        ลบ
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
