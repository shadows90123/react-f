import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";
import { auth, GetAllDocument } from "../../../libs/Firebase";

import {
    getPageType,
    getMainPathText,
    getSubPathText,
} from "../../../libs/StringParser";

import TableData from "./TableData";

import { Tabs, Tab, Card, Row } from "react-bootstrap";

const getCurrentDocs = (_docs) => {
    let reqDocs = {};
    let hisDocs = {};
    _.keys(_docs).map((key) => {
        const d = _docs[key];
        const state = d.approved["teacher"].state;

        if (state === "submitted") {
            reqDocs = { ...reqDocs, [key]: d };
        }
        if (state !== "submitted" && state !== "unsubmitted") {
            hisDocs = { ...hisDocs, [key]: d };
        }
    });

    return { reqDocs, hisDocs };
};

export default function Main() {
    let location = useLocation();
    const [user] = useAuthState(auth);
    const [isReloadPage, setIsReloadPage] = useState(false);

    // Project & Document Type
    const [projectType, setProjectType] = useState(null);
    const [docType, setDocType] = useState(null);

    // Project & Document Text
    const [projectText, setProjectText] = useState("");
    const [docText, setDocText] = useState("");

    const [docs, setDocs] = useState({});

    const [elReqTable, setElReqTable] = useState(<></>);
    const [elHisTable, setElHisTable] = useState(<></>);

    useEffect(() => {
        if (projectType && docType) {
            const { reqDocs, hisDocs } = getCurrentDocs(docs);

            setElReqTable(
                <TableData
                    _docs={reqDocs}
                    _docType={docType}
                    _permission="edit"
                />
            );
            setElHisTable(
                <TableData
                    _docs={hisDocs}
                    _docType={docType}
                    _permission="view"
                />
            );
        }
    }, [docs, projectType, docType]);

    useEffect(() => {
        const { project, document } = getPageType(location.pathname);
        setProjectType(project);
        setDocType(document);

        if (project && document) {
            setProjectText(getMainPathText(project, "student"));
            setDocText(getSubPathText(project, document, "student"));
        }

        if (!_.isEmpty(user)) {
            const fetchAll = async (project, document) => {
                const docsRef = await GetAllDocument("documents");

                let _docs = {};

                _.keys(docsRef).map(async (key) => {
                    const doc = docsRef[key];
                    const isTeacher =
                        doc.approved["teacher"]?.teacher_id === user?.uid ??
                        false;
                    const isType =
                        doc.project_type === project &&
                        doc.doc_type === document;

                    if (isTeacher && isType) {
                        _docs = { ..._docs, [key]: doc };
                    }
                });

                setDocs(_docs);
                setIsReloadPage(false);
            };

            fetchAll(project, document);
        }
    }, [user, location.pathname, isReloadPage]);

    if (isReloadPage) return <Skeleton />;

    return (
        <Card>
            <Card.Header>{`${projectText} ${docText}`}</Card.Header>
            <Card.Body>
                <Row className="mb-2">
                    <Tabs
                        defaultActiveKey="request"
                        id="document-1-tab"
                        className="mb-3"
                    >
                        <Tab eventKey="request" title="ตารางโครงการ">
                            {elReqTable}
                        </Tab>
                        <Tab eventKey="history" title="ประวัติ">
                            {elHisTable}
                        </Tab>
                    </Tabs>
                </Row>
            </Card.Body>
        </Card>
    );
}
