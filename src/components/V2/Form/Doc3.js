import _ from "lodash";
import { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

export default function Document({
    formData,
    formUpdate,
    majors,
    groups,
    fromDisabled,
}) {
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
                                checked={_formData[item] ?? false}
                                onChange={_onChange}
                                disabled={fromDisabled}
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
                                checked={_formData["group"] === item}
                                onChange={_onChange}
                                disabled={fromDisabled}
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
                        value={_formData["projectName"] ?? ""}
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
