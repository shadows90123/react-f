import _ from "lodash";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserData } from "../../hooks/useUserData";
import { auth, GetAllDocument } from "../../libs/Firebase";
import { getDateLocale } from "../../libs/DateParser";

import { Card, Table, ListGroup } from "react-bootstrap";

import FormUser from "../../components/V2/Form/User";

const stateLocal = {
    submitted: "รอดำเนินการ",
    unsubmitted: "ยังไม่ดำเนินการ",
    approved: "ผ่าน",
    unapproved: "ไม่ผ่าน",
};

const docsLocal = {
    1: "เอกสาร ป.1",
    "2_1": "เอกสาร ป.2 (ความก้าวหน้า)",
    "2_2": "เอกสาร ป.2 (ขั้นสุดท้าย)",
    3: "เอกสาร ป.3",
    4: "เอกสาร ป.4",
};

export default function Home() {
    const [user] = useAuthState(auth);
    const [userData] = useUserData();
    const [docs, setDocs] = useState({});

    const [elemTable, setElemTable] = useState(<></>);

    useEffect(() => {
        if (!_.isEmpty(user)) {
            const fetchAll = async () => {
                const docsRef = await GetAllDocument("documents");
                let _docs = {};

                _.keys(docsRef).map((key) => {
                    const doc = docsRef[key];
                    if (doc.owner_id === user?.uid) {
                        _docs = { ..._docs, [key]: doc };
                    }
                });

                setDocs(_docs);
            };

            fetchAll();
        }
    }, [user]);

    useEffect(() => {
        if (!_.isEmpty(docs)) {
            setElemTable(
                <>
                    {_.keys(docs).map((key) => {
                        const doc = docs[key];
                        if (
                            doc.doc_type.startsWith("1") ||
                            doc.doc_type.startsWith("4")
                        ) {
                            return (
                                <tr key={key}>
                                    <td>{doc.doc_form.projectName}</td>
                                    <td>{`โครงการ ${doc.project_type} / ${
                                        docsLocal[doc.doc_type]
                                    }`}</td>
                                    <td>
                                        {stateLocal[doc.approved.teacher.state]}
                                    </td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            );
                        } else if (doc.doc_type.startsWith("2")) {
                            return (
                                <tr key={key}>
                                    <td>{doc.doc_form.projectName}</td>
                                    <td>{`โครงการ ${doc.project_type} / ${
                                        docsLocal[doc.doc_type]
                                    }`}</td>
                                    <td>
                                        {stateLocal[doc.approved.teacher.state]}
                                    </td>
                                    <td>
                                        {
                                            stateLocal[
                                                doc.approved.president.state
                                            ]
                                        }
                                    </td>
                                    <td>
                                        {doc.approved.exam.dated
                                            ? getDateLocale(
                                                  doc.approved.exam.dated
                                              )
                                            : "ยังไม่กำหนด"}
                                    </td>
                                    <td>
                                        {stateLocal[doc.approved.exam.state]}
                                    </td>
                                </tr>
                            );
                        } else if (doc.doc_type.startsWith("3")) {
                            return (
                                <tr key={key}>
                                    <td>{doc.doc_form.projectName}</td>
                                    <td>{`โครงการ ${doc.project_type} / ${
                                        docsLocal[doc.doc_type]
                                    }`}</td>
                                    <td>
                                        {stateLocal[doc.approved.teacher.state]}
                                    </td>
                                    <td>
                                        {
                                            stateLocal[
                                                doc.approved.president.state
                                            ]
                                        }
                                    </td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            );
                        }
                    })}
                </>
            );
        }
    }, [docs]);

    return (
        <Card>
            <Card.Header>หน้าหลัก</Card.Header>
            <Card.Body>
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>{userData.name}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                อีเมล: {userData.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                เบอร์: {userData.tel}
                            </ListGroup.Item>
                        </ListGroup>
                        <FormUser
                            userData={{ [user?.uid]: userData }}
                            type="edit"
                            onReloadPage={() => {
                                window.location.reload();
                            }}
                        />
                    </Card.Body>
                </Card>
            </Card.Body>

            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ชื่อโปรเจ็ค</th>
                            <th>เอกสาร</th>
                            <th>สถานะอาจารย์</th>
                            <th>สถานะประธานสาขา</th>
                            <th>วัน/เวลา การสอบ</th>
                            <th>สถานะการสอบ</th>
                        </tr>
                    </thead>
                    <tbody>{elemTable}</tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}
