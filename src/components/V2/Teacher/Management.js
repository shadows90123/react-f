import _ from "lodash";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Card, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import { auth, GetAllDocument } from "../../../libs/Firebase";
import {
    getCurrentDocs,
    getPageType,
    getMainPathText,
    getSubPathText,
} from "../../../libs/coreFunc";
import TableCurrent from "./TableCurrent";
import TableHistory from "./TableHistory";

export default function Management() {
    let location = useLocation();
    const [user] = useAuthState(auth);
    const [isReloadPage, setIsReloadPage] = useState(false);

    // Project & Document Type
    const [projectType, setProjectType] = useState("");
    const [docType, setDocType] = useState("");

    // Project & Document Text
    const [projectText, setProjectText] = useState("");
    const [docText, setDocText] = useState("");

    const [docs, setDocs] = useState({});

    const [elReqTable, setElReqTable] = useState(<></>);
    const [elHisTable, setElHisTable] = useState(<></>);

    const onReloadPage = () => {
        setIsReloadPage(true);
    };

    useEffect(() => {
        if (projectType !== "" && docType !== "") {
            const { reqDocs, hisDocs } = getCurrentDocs(docs, "teacher");

            setElReqTable(
                <TableCurrent
                    _docs={reqDocs}
                    _meta={{
                        projectType,
                        docType,
                    }}
                    _onReloadPage={onReloadPage}
                />
            );

            setElHisTable(
                <TableHistory
                    _docs={hisDocs}
                    _meta={{
                        projectType,
                        docType,
                    }}
                    _onReloadPage={onReloadPage}
                />
            );
        }
    }, [docs, projectType, docType]);

    useEffect(() => {
        const { project, document } = getPageType(location.pathname);
        setProjectType(project);
        setDocType(document);

        if (project && document) {
            setProjectText(getMainPathText(project, "teacher"));
            setDocText(getSubPathText(project, document, "teacher"));
        }

        if (!_.isEmpty(user)) {
            const fetchAll = async (project, document) => {
                const docsRef = await GetAllDocument("documents");

                let _docs = {};

                _.keys(docsRef).map(async (key) => {
                    const doc = docsRef[key];
                    const isRole =
                        doc.approved["teacher"]?.teacher_id === user?.uid ??
                        false;
                    const isType =
                        doc.project_type === project &&
                        doc.doc_type === document;

                    if (isRole && isType) {
                        _docs = { ..._docs, [key]: doc };
                    }
                });

                setDocs(_docs);
                setElReqTable(<></>);
                setElHisTable(<></>);
                setIsReloadPage(false);
            };

            fetchAll(project, document);
        }
    }, [user, location.pathname, isReloadPage]);

    if (isReloadPage) return <Skeleton />;

    return (
        <Card>
            <Card.Header className="h5">{`${projectText} ${docText}`}</Card.Header>
            <Card.Body>
                <Row className="mb-2">
                    <Tabs
                        defaultActiveKey="request"
                        id="document-1 -tab"
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
