import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SignatureCanvas from "react-signature-canvas";

import {
    GetAllDocument,
    AddDocument,
    UpdateDocument,
    DeleteDocument,
    PresidentApproveForm,
    SignatureForm,
    getFromStorage,
} from "../../../libs/Firebase";
import GenerateDoc from "../../../libs/pdf";

import { Modal, Button, Form, Col, Row } from "react-bootstrap";

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

export default function Document({
    disable = false,
    type,
    owner,
    docs,
    meta,
    onReloadPage,
}) {
    const [modalShow, setModalShow] = useState(false);
    const [_type] = useState(type);
    const [_meta] = useState(meta);
    const [_owner] = useState(owner);

    const [allTeacher, setAllTeacher] = useState({});
    const [_docs, setDocs] = useState({});
    const [formData, setFormData] = useState({});
    const [signCanvas, setSignCanvas] = useState("");

    const isCreate = _type === "create";
    const isEdit = _type === "edit";
    const isView = _type === "view";
    const isDelete = _type === "delete";
    const isApprove = _type === "approve";
    const isDownload = _type === "download";
    const isTeacherProve = _type === "teacherProve";
    const isPresidentProve = _type === "presidentProve";

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
        : "";

    const btnColor = isDelete ? "danger" : "primary";

    const resetSignature = () => {
        signCanvas.clear();
    };

    const onChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? !formData[name] : value,
        });
    };

    const onSubmit = async (e, state = undefined) => {
        e.preventDefault();

        if (isCreate && !_owner.uid) {
            toast.success("เกิดข้อผิดพลาด: ไม่พบข้อมูลผู้ใช้");
            return;
        }

        try {
            if (isCreate) {
                await AddDocument("documents", {
                    created_at: new Date().toJSON(),
                    updated_at: new Date().toJSON(),
                    project_type: _meta.projectType,
                    doc_type: _meta.docType,
                    doc_form: formData,
                    owner_id: _owner.uid,
                    approved: {
                        teacher: {
                            state: "unsubmitted",
                            created_at: new Date().toJSON(),
                            updated_at: new Date().toJSON(),
                        },
                        president: {
                            state: "unsubmitted",
                            created_at: new Date().toJSON(),
                            updated_at: new Date().toJSON(),
                        },
                    },
                    signatured: "",
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

                const sigUrl = await getFromStorage(docVal.signatured);

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

                await UpdateDocument("documents", docId, {
                    updated_at: new Date().toJSON(),
                    "approved.teacher.state": "submitted",
                    "approved.teacher.teacher_id": formData?.teacher,
                    "approved.teacher.created_at": new Date().toJSON(),
                    "approved.teacher.updated_at": new Date().toJSON(),
                });
            } else if (isTeacherProve) {
                const docId = _.keys(_docs)[0];
                const signature = signCanvas
                    .getTrimmedCanvas()
                    .toDataURL("signCanvas");

                await SignatureForm(docId, signature);
            } else if (isPresidentProve) {
                const docId = _.keys(_docs)[0];
                await PresidentApproveForm(docId, state);
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
        if (!_.isEmpty(docs)) {
            setDocs(docs);
            setFormData(_.values(docs)[0].doc_form);
        }
    }, [docs]);

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
                aria-labelledby="contained-modal-document-1"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-document-1">
                        {typeLabel} เอกสาร ป.1
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
                    ) : (
                        <Form>
                            {/* Major */}
                            <Row className="mb-2">
                                <Form.Group className="mb-3">
                                    {_.keys(majors).map((item) => {
                                        return (
                                            <Form.Check
                                                key={item}
                                                inline
                                                label={majors[item]}
                                                name={item}
                                                type="checkbox"
                                                checked={
                                                    formData[item] ?? false
                                                }
                                                onChange={onChange}
                                                disabled={isView}
                                            />
                                        );
                                    })}
                                </Form.Group>
                            </Row>
                            {/* Student 1 */}
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>1. ชื่อ-สกุล</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName1"
                                        value={formData["fullName1"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>รห้สนักศึกษา</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="studentId1"
                                        value={formData["studentId1"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="tel1"
                                        value={formData["tel1"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>
                            {/* Student 2 */}
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>2. ชื่อ-สกุล</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName2"
                                        value={formData["fullName2"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>รห้สนักศึกษา</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="studentId2"
                                        value={formData["studentId2"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="tel2"
                                        value={formData["tel2"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>
                            {/* Student 3 */}
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>3. ชื่อ-สกุล</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName3"
                                        value={formData["fullName3"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>รห้สนักศึกษา</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="studentId3"
                                        value={formData["studentId3"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="tel3"
                                        value={formData["tel3"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>
                            {/* Group */}
                            <Row className="mb-2">
                                <Form.Group className="mb-3">
                                    {_.keys(groups).map((item) => {
                                        return (
                                            <Form.Check
                                                key={item}
                                                inline
                                                label={groups[item]}
                                                name="group"
                                                type="radio"
                                                value={item}
                                                checked={
                                                    formData["group"] === item
                                                }
                                                onChange={onChange}
                                                disabled={isView}
                                            />
                                        );
                                    })}
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group className="mb-3">
                                    <Form.Label className="me-2">
                                        อาจารย์ที่ปรึกษา
                                    </Form.Label>
                                    <Form.Check
                                        inline
                                        label="แต่งตั้ง"
                                        name="appoint"
                                        type="checkbox"
                                        checked={formData["appoint"] ?? false}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>หัวข้อโครงการ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="projectName"
                                        value={formData["projectName"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        อาจารย์ที่ปรึกษา (หลัก)
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="teacherMain"
                                        value={formData["teacherMain"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        อาจารย์ที่ปรึกษา (ร่วม)
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="teacherCo"
                                        value={formData["teacherCo"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>1. ลงชื่อนักศึกษา</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="studentSign1"
                                        value={formData["studentSign1"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>2. ลงชื่อนักศึกษา</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="studentSign2"
                                        value={formData["studentSign2"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>3. ลงชื่อนักศึกษา</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="studentSign3"
                                        value={formData["studentSign3"] ?? ""}
                                        onChange={onChange}
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>

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
                <Modal.Footer>
                    {(isEdit || isCreate) && (
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

                    {(isTeacherProve || isPresidentProve) && (
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => {
                                onSubmit(e, "approved");
                            }}
                        >
                            อนุมัติ
                        </Button>
                    )}

                    {isPresidentProve && (
                        <Button
                            variant="danger"
                            type="submit"
                            onClick={(e) => {
                                onSubmit(e, "unapproved");
                            }}
                        >
                            ไม่อนุมัติ
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
