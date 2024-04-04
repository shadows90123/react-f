import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { AddDocument } from "../../../../libs/Firebase";

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

export default function CreateButton({ disabled, user, config, onReloadPage }) {
    const [_user, setUser] = useState({});
    const [_config, setConfig] = useState({});
    const [modalShow, setModalShow] = useState(false);
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

        if (!_user.uid) {
            toast.error("เกิดข้อผิดพลาด: ไม่พบข้อมูลผู้ใช้");
            return;
        }

        try {
            await AddDocument("documents", {
                created_at: new Date().toJSON(),
                updated_at: new Date().toJSON(),
                project_type: _config?.project,
                doc_type: _config?.doc,
                doc_form: formData,
                owner_id: _user.uid,
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
            onHide();
            toast.success("บันทึกสำเร็จ");
            onReloadPage();
        } catch (error) {
            toast.error(`เกิดข้อผิดพลาด : ${error.message}`);
        }
    };

    const onHide = () => {
        setModalShow(false);
    };

    useEffect(() => {
        if (!_.isEmpty(user)) {
            setUser(user);
        }
        setConfig(config);
    }, [user, config]);

    return (
        <>
            <Button
                variant="primary"
                className="m-1"
                onClick={() => setModalShow(true)}
                disabled={!disabled}
            >
                กรอกข้อมูล
            </Button>
            <Modal
                onHide={onHide}
                show={modalShow}
                size="xl"
                aria-labelledby="contained-modal-document1-create"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-document1-create">
                        กรอกเอกสาร ป.1
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
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>รห้สนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentId1"
                                    value={formData["studentId1"] ?? ""}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tel1"
                                    value={formData["tel1"] ?? ""}
                                    onChange={onChange}
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
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>รห้สนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentId2"
                                    value={formData["studentId2"] ?? ""}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tel2"
                                    value={formData["tel2"] ?? ""}
                                    onChange={onChange}
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
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>รห้สนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentId3"
                                    value={formData["studentId3"] ?? ""}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tel3"
                                    value={formData["tel3"] ?? ""}
                                    onChange={onChange}
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
                                            checked={formData["group"] === item}
                                            onChange={onChange}
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
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>อาจารย์ที่ปรึกษา (หลัก)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="teacherMain"
                                    value={formData["teacherMain"] ?? ""}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>อาจารย์ที่ปรึกษา (ร่วม)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="teacherCo"
                                    value={formData["teacherCo"] ?? ""}
                                    onChange={onChange}
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
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>2. ลงชื่อนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentSign2"
                                    value={formData["studentSign2"] ?? ""}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>3. ลงชื่อนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentSign3"
                                    value={formData["studentSign3"] ?? ""}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        บันทึก
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
