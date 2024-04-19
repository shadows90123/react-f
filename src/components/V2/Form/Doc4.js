import _ from "lodash";
import { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

export default function Document({ formData, formUpdate, fromDisabled }) {
    const [_formData, setFormData] = useState(formData);

    const _onChange = (e) => {
        const { name, value, type } = e.target;

        setFormData({
            ..._formData,
            [name]: type === "checkbox" ? !_formData[name] : value,
        });

        const _data = {
            ..._formData,
            [name]: type === "checkbox" ? !_formData[name] : value,
        };

        formUpdate(_data);
    };
    return (
        <>
            <Row className="mb-2">
                <Form.Group as={Col}>
                    <Form.Label>เสนอหัวข้อโครงงาน</Form.Label>
                    <Form.Control
                        type="text"
                        name="projectName"
                        value={_formData["projectName"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>สาขาวิชา</Form.Label>
                    <Form.Control
                        type="text"
                        name="major"
                        value={_formData["major"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-2">
                <Form.Group as={Col}>
                    <Form.Label>จำนวนเงิน</Form.Label>
                    <Form.Control
                        type="text"
                        name="money"
                        value={_formData["money"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>จำนวนเงินภาษาไทย</Form.Label>
                    <Form.Control
                        type="text"
                        name="moneyText"
                        value={_formData["moneyText"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
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
                        value={_formData["fullName1"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>รห้สนักศึกษา</Form.Label>
                    <Form.Control
                        type="text"
                        name="studentId1"
                        value={_formData["studentId1"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                    <Form.Control
                        type="text"
                        name="tel1"
                        value={_formData["tel1"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
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
                        value={_formData["fullName2"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>รห้สนักศึกษา</Form.Label>
                    <Form.Control
                        type="text"
                        name="studentId2"
                        value={_formData["studentId2"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                    <Form.Control
                        type="text"
                        name="tel2"
                        value={_formData["tel2"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
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
                        value={_formData["fullName3"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>รห้สนักศึกษา</Form.Label>
                    <Form.Control
                        type="text"
                        name="studentId3"
                        value={_formData["studentId3"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>เบอร์โทรติดต่อ</Form.Label>
                    <Form.Control
                        type="text"
                        name="tel3"
                        value={_formData["tel3"] ?? ""}
                        onChange={_onChange}
                        disabled={fromDisabled}
                    />
                </Form.Group>
            </Row>
        </>
    );
}
