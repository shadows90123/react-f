import { useState, useEffect } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import SignatureCanvas from "react-signature-canvas";
import { SignatureForm } from "../../../libs/Firebase";

import { Row, Button, Modal, Form, Col } from "react-bootstrap";

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

export default function Document({ docs, permission }) {
    const [modalShow, setModalShow] = useState(false);

    const [_docs, setDocs] = useState({});
    const [_permission, setPermission] = useState("");

    const [formData, setFormData] = useState({});
    const [signCanvas, setSignCanvas] = useState("");

    const handleResetSignature = () => {
        signCanvas.clear();
    };

    const onHide = () => {
        setModalShow(false);
    };

    const onChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? !formData[name] : value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const docId = _.keys(_docs)[0];
            const signature = signCanvas
                .getTrimmedCanvas()
                .toDataURL("signCanvas");

            await SignatureForm(docId, signature);
            toast.success("ยืนยันสำเร็จ");
        } catch (error) {
            toast.error(`เกิดข้อผิดพลาด : ${error.message}`);
        }
    };

    useEffect(() => {
        if (!_.isEmpty(docs)) {
            setDocs(docs);
            setFormData(_.values(docs)[0].doc_form);
        }
        setPermission(permission);
    }, [docs, permission]);

    return (
        <>
            <Button
                variant="primary"
                size="sm"
                onClick={() => setModalShow(true)}
            >
                ดูเอกสาร
            </Button>
            <Modal
                onHide={onHide}
                show={modalShow}
                size="xl"
                aria-labelledby="contained-modal-document1-sig"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-document1-sig">
                        เอกสาร ป.3
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                            checked={formData[item] ?? false}
                                            onChange={onChange}
                                            disabled
                                        />
                                    );
                                })}
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
                                            checked={formData["group"] === item}
                                            onChange={onChange}
                                            disabled
                                        />
                                    );
                                })}
                            </Form.Group>
                        </Row>

                        <Row className="mb-2">
                            <Form.Group as={Col}>
                                <Form.Label>เสนอหัวข้อโครงงาน</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="projectName"
                                    value={formData["projectName"] ?? ""}
                                    onChange={onChange}
                                    disabled
                                />
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
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>รห้สนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentId1"
                                    value={formData["studentId1"] ?? ""}
                                    onChange={onChange}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tel1"
                                    value={formData["tel1"] ?? ""}
                                    onChange={onChange}
                                    disabled
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
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>รห้สนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentId2"
                                    value={formData["studentId2"] ?? ""}
                                    onChange={onChange}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tel2"
                                    value={formData["tel2"] ?? ""}
                                    onChange={onChange}
                                    disabled
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
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>รห้สนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentId3"
                                    value={formData["studentId3"] ?? ""}
                                    onChange={onChange}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tel3"
                                    value={formData["tel3"] ?? ""}
                                    onChange={onChange}
                                    disabled
                                />
                            </Form.Group>
                        </Row>
                        {_permission === "edit" ? (
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
                                            ref={(data) => setSignCanvas(data)}
                                        />
                                    </div>
                                </Form.Group>
                            </Row>
                        ) : (
                            <></>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {_permission === "edit" ? (
                        <>
                            <Button
                                variant="secondary"
                                onClick={handleResetSignature}
                            >
                                เคลียร์ลายเซ็น
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={onSubmit}
                            >
                                บันทึก
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}
                    <Button variant="secondary" onClick={onHide}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
