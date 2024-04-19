import { useState, useEffect } from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import _ from "lodash";

import { GetDocument } from "../../../libs/Firebase";
import { getDateLocale } from "../../../libs/DateParser";

export default function State({ docs }) {
    const [_docs, setDocs] = useState({});
    const [_teacher, setTeacher] = useState({});

    const getVerifyState = (type) => {
        if (_.isEmpty(_docs)) return "ไม่มีข้อมูล";

        const docVal = _.values(_docs)[0];

        const approvedText = {
            unsubmitted: "ยังไม่ได้ยื่นขอ",
            submitted: "ยื่นขอลายเซ็น",
            approved: "ผ่าน",
            unapproved: "ไม่ผ่าน",
        };

        return approvedText[docVal.approved[type].state];
    };

    const getNote = (type) => {
        if (_.isEmpty(_docs)) return "ไม่มีข้อมูล";

        const docVal = _.values(_docs)[0];

        return docVal.approved[type]?.note ?? "";
    };

    const isPresidentApproved = (type) => {
        if (!type) return false;

        const _type = ["2_1", "2_2"];

        for (const i in _type) {
            if (type.search(_type[i]) !== -1) {
                return true;
            }
        }

        return false;
    };

    useEffect(() => {
        setTeacher({});
        setDocs({});
        if (!_.isEmpty(docs)) {
            setTeacher({});
            setDocs(docs);

            const fetchReq = async () => {
                const docVal = _.values(docs)[0];
                const teacherId =
                    docVal?.approved["teacher"]?.teacher_id ?? false;
                if (teacherId) {
                    const teacherRef = await GetDocument("users", teacherId);
                    setTeacher(teacherRef);
                }
            };

            fetchReq();
        }
    }, [docs]);

    return (
        <Card body className="mb-2">
            <Card.Subtitle className="mb-2 text-muted">สถานะ</Card.Subtitle>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>เอกสาร</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                วันที่สร้าง :{" "}
                                {getDateLocale(_.values(_docs)[0]?.created_at)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                แก้ไขล่าสุด :{" "}
                                {getDateLocale(_.values(_docs)[0]?.updated_at)}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>การยืนยัน (อาจารย์ที่ปรึกษา)</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                อาจารย์ : {_teacher?.email || "ไม่มีข้อมูล"}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                สถานะ : {getVerifyState("teacher")}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                {isPresidentApproved(_.values(_docs)[0]?.doc_type) ? (
                    <Col>
                        <Card>
                            <Card.Header>การยืนยัน (ประธาน)</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    สถานะ : {getVerifyState("president")}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    เนื่องจาก : {getNote("president")}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                ) : (
                    <></>
                )}
            </Row>
        </Card>
    );
}
