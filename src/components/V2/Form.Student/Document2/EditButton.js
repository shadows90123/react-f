import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { UpdateDocument } from "../../../../libs/Firebase";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const majors = {
    major1: "โยธา",
    major2: "อุสาหการ",
    major3: "สิ่งแวดล้อม",
    major4: "คอมพิวเตอร์",
    major5: "พลังงาน",
};

export default function EditButton({ disabled, user, docMeta, onReloadPage }) {
    const [modalShow, setModalShow] = useState(false);
    const [_user, setUser] = useState({});
    const [_docs, setDocs] = useState({});
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

        if (!_user.uid) {
            toast.success("เกิดข้อผิดพลาด: ไม่พบข้อมูลผู้ใช้");
            return;
        }

        try {
            await UpdateDocument("documents", docId, {
                doc_form: formData,
                updated_at: new Date().toJSON(),
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
        if (!_.isEmpty(user)) setUser(user);
        if (!_.isEmpty(docMeta)) {
            setDocs(docMeta);
            setFormData(_.values(docMeta)[0].doc_form);
        }
    }, [user, docMeta]);

    return (
        <>
            <Button
                variant="primary"
                className="m-1"
                onClick={() => setModalShow(true)}
                disabled={!disabled}
            >
                แก้ไขข้อมูล
            </Button>
            <Modal
                onHide={onHide}
                show={modalShow}
                size="xl"
                aria-labelledby="contained-modal-document2-edit"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-document2-edit">
                        แก้ไขเอกสาร ป.2
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
                        <Row className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="me-2">
                                    การจัดทำโครงการวิศวกรรม
                                </Form.Label>
                                <Form.Check
                                    inline
                                    label="โครงการ 1"
                                    name="project"
                                    type="radio"
                                    value="1"
                                    checked={formData["project"] === "1"}
                                    onChange={onChange}
                                    disabled
                                />
                                <Form.Check
                                    inline
                                    label="โครงการ 2"
                                    name="project"
                                    type="radio"
                                    value="2"
                                    checked={formData["project"] === "2"}
                                    onChange={onChange}
                                    disabled
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group className="mb-3">
                                <Form.Label className="me-2">
                                    มีความประสงค์ขอสอบ
                                </Form.Label>
                                <Form.Check
                                    inline
                                    label="ความก้าวหน้า"
                                    name="purpose"
                                    type="radio"
                                    value="progress"
                                    checked={formData["purpose"] === "progress"}
                                    onChange={onChange}
                                    disabled
                                />
                                <Form.Check
                                    inline
                                    label="ปริญญานิพนธ์ขั้นสุดท้าย"
                                    name="purpose"
                                    type="radio"
                                    value="final"
                                    checked={formData["purpose"] === "final"}
                                    onChange={onChange}
                                    disabled
                                />
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
                        <Row className="mb-2">
                            <Form.Group as={Col}>
                                <Form.Label>ลงชื่อนักศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentSign"
                                    value={formData["studentSign"] ?? ""}
                                    onChange={onChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>ภาคเรียนที่</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="term"
                                    value={formData["term"] ?? ""}
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>ปีการศึกษา</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="year"
                                    value={formData["year"] ?? ""}
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
