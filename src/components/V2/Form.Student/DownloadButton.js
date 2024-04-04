import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import GenerateDoc from "../../../libs/pdf";
import { getFromStorage } from "../../../libs/Firebase";

export default function DownloadButton({ disabled, docMeta }) {
    const [modalShow, setModalShow] = useState(false);
    const [_docs, setDocs] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();

        const docId = _.keys(_docs)[0] ?? false;
        const docVal = _.values(_docs)[0];

        if (!docId) {
            toast.error("เกิดข้อผิดพลาด: ไม่พบข้อมูลเอกสาร");
            return;
        }

        try {
            const sigUrl = await getFromStorage(docVal.signatured);

            GenerateDoc({
                data: docVal,
                sigUrl: sigUrl,
                fileName: `project${docVal.project_type}_document${docVal.doc_type}`,
            });
            onHide();
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
                โหลดเอกสาร
            </Button>
            <Modal
                onHide={onHide}
                show={modalShow}
                size="md"
                aria-labelledby="contained-modal-document1-download"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-document1-download">
                        โหลดเอกสาร ป.1
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>โหลดเอกสาร ป.1</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        โหลด
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
