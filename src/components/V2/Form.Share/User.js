import _ from "lodash";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { registerWithPassword, UpdateDocument } from "../../../libs/Firebase";

const Roles = {
    student: "นักศึกษา",
    teacher: "อาจารย์",
    president: "ประธาน",
    admin: "ผู้ดูแลระบบ",
};

export default function FormUser({ userData, type, onReloadPage }) {
    const [modalShow, setModalShow] = useState(false);
    const [formType, setFormType] = useState("view");
    const [userId, setUserId] = useState(null);
    const [form, setForm] = useState({});

    const isCreate = formType === "create";
    const isEdit = formType === "edit";
    const isView = formType === "view";
    const isDelete = formType === "delete";

    const onHide = () => {
        setModalShow(false);
    };

    const onChange = (e) => {
        const { name, value, type } = e.target;

        setForm((prev) => {
            return {
                ...prev,
                [name]: type === "checkbox" ? !form[name] : value,
            };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isCreate) {
                const isRegister = await registerWithPassword(form);
                if (isRegister) {
                    onHide();
                    toast.success("สำเร็จ");
                    onReloadPage();
                } else {
                    toast.error("เกิดข้อผิดพลาด: สมัครไม่สำเร็จ");
                }
            } else if (isEdit) {
                const { name, tel, email, role } = form;
                await UpdateDocument("users", userId, {
                    name,
                    tel,
                    email,
                    role,
                    updated_at: new Date().toJSON(),
                });
                onHide();
                toast.success("สำเร็จ");
                onReloadPage();
            } else if (isDelete) {
                // no function
            }
        } catch (error) {
            toast.error(`เกิดข้อผิดพลาด : ${error.message}`);
        }
    };

    useEffect(() => {
        if (!_.isEmpty(userData)) {
            setUserId(_.keys(userData)[0]);
            setForm(_.values(userData)[0]);
        } else {
            setForm({ role: _.keys(Roles)[0] });
        }
        setFormType(type);
    }, [userData, type]);

    return (
        <>
            <Button
                variant={isDelete ? "danger" : "primary"}
                className="m-1"
                onClick={() => setModalShow(true)}
            >
                {isCreate
                    ? "สร้างบัญชี"
                    : isView
                    ? "ดูข้อมูลบัญชี"
                    : isEdit
                    ? "แก้ไข"
                    : isDelete
                    ? "ลบ"
                    : ""}
            </Button>

            <Modal
                onHide={onHide}
                show={modalShow}
                aria-labelledby="contained-modal-user"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-user">
                        บัญชีผู้ใช้
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isDelete ? (
                        <>ยืนยันการลบ</>
                    ) : (
                        <Form>
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>ชื่อ-สกุล</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={form["name"] ?? ""}
                                        onChange={onChange}
                                        required
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>
                            {form?.role === "student" && (
                                <Row className="mb-2">
                                    <Form.Group as={Col}>
                                        <Form.Label>รห้สนักศึกษา</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="studentId"
                                            value={form["studentId"] ?? ""}
                                            onChange={onChange}
                                            required
                                            disabled={isView}
                                        />
                                    </Form.Group>
                                </Row>
                            )}
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>เบอร์โทร</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="tel"
                                        value={form["tel"] ?? ""}
                                        onChange={onChange}
                                        required
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>อีเมล</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form["email"] ?? ""}
                                        onChange={onChange}
                                        required
                                        disabled={isView}
                                    />
                                </Form.Group>
                            </Row>
                            {isCreate && (
                                <Row className="mb-2">
                                    <Form.Group as={Col}>
                                        <Form.Label>รหัสผ่าน</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={form["password"] ?? ""}
                                            onChange={onChange}
                                            required
                                            disabled={isView}
                                        />
                                    </Form.Group>
                                </Row>
                            )}
                            <Row className="mb-2">
                                <Form.Group as={Col}>
                                    <Form.Label>บทบาท</Form.Label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="role"
                                        onChange={onChange}
                                        required
                                        disabled={isView}
                                    >
                                        {_.keys(Roles).map((key) => {
                                            return (
                                                <option
                                                    key={key}
                                                    value={key}
                                                    selected={
                                                        form["role"] === key
                                                    }
                                                >
                                                    {Roles[key]}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </Form.Group>
                            </Row>
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

                    <Button variant="secondary" onClick={onHide}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
