import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SignatureCanvas from "react-signature-canvas";

import {
    GetAllDocument,
    ApproveDocForm,
    UpdateDocument,
    DeleteDocument,
    CreateDocForm,
    PresidentApproveForm,
    SignatureForm,
    ExamDateForm,
    ExamStateForm,
    getFromStorage,
} from "../../../libs/Firebase";
import GenerateDoc from "../../../libs/pdf";

import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import DateAndTimePicker from "../DateAndTimePicker";

import Document1 from "./Doc1";
import Document2 from "./Doc2";
import Document3 from "./Doc3";
import Document4 from "./Doc4";

const majors = {
    major1: "โยธา",
    major2: "อุสาหการ",
    major3: "สิ่งแวดล้อม",
    major4: "คอมพิวเตอร์",
    major5: "พลังงาน",
};

const groups = {
    group1: "กลุ่ม 1",
    group2: "กลุ่ม 2",
    group3: "กลุ่ม 3",
    group4: "กลุ่มอื่น ๆ",
};
export default function LayoutForm({
    disable = false,
    type,
    owner,
    docs,
    meta,
    onReloadPage,
}) {
    const [modalShow, setModalShow] = useState(false);

    const [allTeacher, setAllTeacher] = useState({});
    const [_docs, setDocs] = useState({});
    const [formData, setFormData] = useState({});
    const [signCanvas, setSignCanvas] = useState("");
    const [reason, setReason] = useState("");

    const [elemDocument, setElemDocument] = useState(<></>);
    const [modelTitle] = useState(meta.docType.charAt(0));

    const isCreate = type === "create";
    const isEdit = type === "edit";
    const isView = type === "view";
    const isDelete = type === "delete";
    const isApprove = type === "approve";
    const isDownload = type === "download";
    const isTeacherProve = type === "teacherProve";
    const isPresidentProve = type === "presidentProve";
    const isDateExam = type === "dateExam";
    const isStateExam = type === "stateExam";

    const fromDisabled =
        isView || isTeacherProve || isPresidentProve || isStateExam;

    const typeLabel = isCreate
        ? "เพิ่ม"
        : isView
        ? "ดูข้อมูล"
        : isEdit
        ? "แก้ไข"
        : isDelete
        ? "ลบ"
        : isApprove
        ? "ยื่นขอลายเซ็น"
        : isDownload
        ? "โหลด"
        : isTeacherProve
        ? "ตรวจเอกสาร"
        : isPresidentProve
        ? "ตรวจเอกสาร"
        : isDateExam
        ? "เวลาสอบ"
        : isStateExam
        ? "สถานะการสอบ"
        : "";

    const btnColor = isDelete ? "danger" : "primary";

    const resetSignature = () => {
        signCanvas.clear();
    };

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const handleDateTimeChange = (value) => {
        setSelectedDateTime(value);
    };

    const onChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? !formData[name] : value,
        });
    };

    const formUpdate = (data) => {
        setFormData(data);
    };

    const onSubmit = async (e, state = undefined) => {
        e.preventDefault();

        if (isCreate && !owner?.uid) {
            toast.success("เกิดข้อผิดพลาด: ไม่พบข้อมูลผู้ใช้");
            return;
        }

        try {
            if (isCreate) {
                await CreateDocForm({
                    project_type: meta.projectType,
                    doc_type: meta.docType,
                    doc_form: formData,
                    owner_id: owner.uid,
                });
            } else if (isEdit) {
                const docId = _.keys(_docs)[0] ?? false;

                await UpdateDocument("documents", docId, {
                    doc_form: formData,
                    updated_at: new Date().toJSON(),
                });
            } else if (isDelete) {
                const docId = _.keys(_docs)[0] ?? false;
                if (!docId) {
                    toast.error("เกิดข้อผิดพลาด: ไม่พบข้อมูลเอกสาร");
                    return;
                }

                await DeleteDocument("documents", docId);
            } else if (isDownload) {
                const docId = _.keys(_docs)[0] ?? false;
                const docVal = _.values(_docs)[0];

                if (!docId) {
                    toast.error("เกิดข้อผิดพลาด: ไม่พบข้อมูลเอกสาร");
                    return;
                }

                const sigUrl = await getFromStorage(
                    docVal.approved["teacher"].signatured
                );

                GenerateDoc({
                    data: docVal,
                    sigUrl: sigUrl,
                    fileName: `project${docVal.project_type}_document${docVal.doc_type}`,
                });
            } else if (isApprove) {
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

                if (
                    formData?.teacher === "" ||
                    formData?.teacher === undefined
                ) {
                    toast.error("เกิดข้อผิดพลาด: ไม่ได้เลือกอาจารย์");
                    return;
                }

                await ApproveDocForm({
                    docId,
                    teacher_id: formData?.teacher,
                });
            } else if (isTeacherProve) {
                const docId = _.keys(_docs)[0];
                const signature = signCanvas
                    .getTrimmedCanvas()
                    .toDataURL("signCanvas");

                await SignatureForm({ docId, signature });
            } else if (isPresidentProve) {
                const docId = _.keys(_docs)[0];
                await PresidentApproveForm({
                    docId,
                    state,
                    reason,
                });
            } else if (isDateExam) {
                const docId = _.keys(_docs)[0];

                await ExamDateForm({
                    docId: docId,
                    dated: new Date(selectedDateTime).toJSON(),
                });
            } else if (isStateExam) {
                const docId = _.keys(_docs)[0];

                await ExamStateForm({
                    docId: docId,
                    state,
                });
            }

            onHide();
            toast.success("สำเร็จ");
            onReloadPage();
        } catch (error) {
            toast.error(`เกิดข้อผิดพลาด : ${error.message}`);
        }
    };

    const onHide = () => {
        setModalShow(false);
    };

    useEffect(() => {
        let _formData = {};

        setFormData({});
        if (!_.isEmpty(docs)) {
            _formData = _.values(docs)[0].doc_form;
            setDocs(docs);
            setFormData(_formData);
        } else {
            if (meta.docType.startsWith("2")) {
                _formData = {
                    project: meta.projectType,
                    purpose: meta.docType === "2_1" ? "progress" : "final",
                };
                setFormData(_formData);
            }
        }

        setElemDocument(
            <>
                {meta?.docType.startsWith("1") ? (
                    <Document1
                        formData={_formData}
                        formUpdate={formUpdate}
                        majors={majors}
                        groups={groups}
                        fromDisabled={fromDisabled}
                    />
                ) : meta?.docType.startsWith("2") ? (
                    <Document2
                        formData={_formData}
                        formUpdate={formUpdate}
                        majors={majors}
                        fromDisabled={fromDisabled}
                    />
                ) : meta?.docType.startsWith("3") ? (
                    <Document3
                        formData={_formData}
                        formUpdate={formUpdate}
                        majors={majors}
                        groups={groups}
                        fromDisabled={fromDisabled}
                    />
                ) : meta?.docType.startsWith("4") ? (
                    <Document4
                        formData={_formData}
                        formUpdate={formUpdate}
                        fromDisabled={fromDisabled}
                    />
                ) : (
                    <></>
                )}
            </>
        );
    }, [docs, meta]);

    useEffect(() => {
        if (isApprove) {
            const fetchUsers = async () => {
                const ref = await GetAllDocument("users");

                let _teachers = {};
                _.keys(ref).map((key) => {
                    if (ref[key].role === "teacher") {
                        _teachers = { ..._teachers, [key]: ref[key] };
                    }
                });
                setAllTeacher(_teachers);
            };

            fetchUsers();
        }
    }, [isApprove]);

    return (
        <>
            <Button
                variant={btnColor}
                className="m-1"
                onClick={() => setModalShow(true)}
                disabled={disable}
            >
                {typeLabel}
            </Button>
            <Modal
                onHide={onHide}
                show={modalShow}
                size="xl"
                aria-labelledby="contained-modal-document-2"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-document-2">
                        {typeLabel} เอกสาร ป.{modelTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isDelete ? (
                        "ยืนยันการลบเอกสาร"
                    ) : isDownload ? (
                        "ยืนยันการโหลดเอกสาร"
                    ) : isApprove ? (
                        <Row className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Select
                                    onChange={onChange}
                                    name="teacher"
                                    value={formData?.teacher ?? ""}
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
                    ) : isDateExam ? (
                        <Row className="mb-2">
                            <DateAndTimePicker
                                selectedDateTime={selectedDateTime}
                                onChange={handleDateTimeChange}
                            />
                        </Row>
                    ) : (
                        <Form>
                            {elemDocument}

                            {isTeacherProve && (
                                <Row className="mb-2">
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            ลายเซ็นอาจารย์ที่ปรึกษา
                                        </Form.Label>
                                        <div
                                            style={{
                                                border: "0.5px solid black ",
                                                width: 220,
                                                heigh: 50,
                                            }}
                                        >
                                            <SignatureCanvas
                                                penColor="black"
                                                canvasProps={{
                                                    width: 220,
                                                    height: 50,
                                                    className: "sigCanvas",
                                                }}
                                                ref={(data) =>
                                                    setSignCanvas(data)
                                                }
                                            />
                                        </div>
                                    </Form.Group>
                                </Row>
                            )}
                        </Form>
                    )}
                </Modal.Body>

                <Modal.Body>
                    {isPresidentProve && (
                        <Row className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label>หมายเหตุ</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={reason}
                                    onChange={(e) => {
                                        setReason(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Row>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    {(isEdit || isCreate || isDateExam) && (
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={onSubmit}
                        >
                            บันทึก
                        </Button>
                    )}

                    {isDelete && (
                        <Button
                            variant="danger"
                            type="submit"
                            onClick={onSubmit}
                        >
                            ลบ
                        </Button>
                    )}

                    {isApprove && (
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={onSubmit}
                        >
                            ยื่นขอลายเซ็น
                        </Button>
                    )}

                    {isDownload && (
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={onSubmit}
                        >
                            โหลด
                        </Button>
                    )}

                    {isTeacherProve && (
                        <Button variant="secondary" onClick={resetSignature}>
                            เคลียร์ลายเซ็น
                        </Button>
                    )}

                    {(isTeacherProve || isPresidentProve || isStateExam) && (
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => {
                                onSubmit(e, "approved");
                            }}
                        >
                            {isStateExam ? "ผ่าน" : "อนุมัติ"}
                        </Button>
                    )}

                    {(isPresidentProve || isStateExam) && (
                        <Button
                            variant="danger"
                            type="submit"
                            onClick={(e) => {
                                onSubmit(e, "unapproved");
                            }}
                        >
                            {isStateExam ? "ไม่ผ่าน" : "ไม่อนุมัติ"}
                        </Button>
                    )}

                    <Button variant="secondary" onClick={onHide}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
