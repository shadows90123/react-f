import _ from "lodash";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { auth, GetAllDocument } from "../../../libs/Firebase";

import {
    getPageType,
    getMainPathText,
    getSubPathText,
} from "../../../libs/coreFunc";
import TableData from "./TableData";

import { Tabs, Tab, Card, Row } from "react-bootstrap";

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

    const onReloadPage = () => {
        setIsReloadPage(true);
    };

    useEffect(() => {
        if (projectType && docType) {
            setElReqTable(
                <TableData
                    _docs={docs}
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
            setProjectText(getMainPathText(project, "admin"));
            setDocText(getSubPathText(project, document, "admin"));
        }

        if (!_.isEmpty(user)) {
            const fetchAll = async (project, document) => {
                const docsRef = await GetAllDocument("documents");

                let _docs = {};

                _.keys(docsRef).map(async (key) => {
                    const doc = docsRef[key];

                    const isType =
                        doc.project_type === project &&
                        doc.doc_type === document;

                    if (isType) {
                        _docs = { ..._docs, [key]: doc };
                    }
                });

                setDocs(_docs);
                setElReqTable(<></>);
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
                    </Tabs>
                </Row>
            </Card.Body>
        </Card>
    );
}
