import _ from "lodash";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePageType } from "../../../hooks/usePageType";
import Skeleton from "react-loading-skeleton";
import { auth, GetAllDocument } from "../../../libs/Firebase";

import { getMainPathText, getSubPathText } from "../../../libs/coreFunc";
import TableData from "./TableData";

import { Tabs, Tab, Card, Row } from "react-bootstrap";

export default function Management() {
    const [user] = useAuthState(auth);
    const [pageType] = usePageType();
    const [isReloadPage, setIsReloadPage] = useState(false);

    const [projectText, setProjectText] = useState("");
    const [docText, setDocText] = useState("");

    const [docs, setDocs] = useState({});

    const [elReqTable, setElReqTable] = useState(<></>);

    const onReloadPage = () => {
        setIsReloadPage(true);
    };

    useEffect(() => {
        if (pageType?.project) {
            const _meta = {
                projectType: pageType.project,
                docType: pageType.document,
            };

            setElReqTable(
                <TableData
                    _docs={docs}
                    _meta={_meta}
                    _onReloadPage={onReloadPage}
                />
            );
        }
    }, [docs, pageType]);

    useEffect(() => {
        const { role, project, document } = pageType;

        setProjectText(getMainPathText(project, role));
        setDocText(getSubPathText(project, document, role));

        if (!_.isEmpty(user)) {
            const fetchAll = async (project, document) => {
                const docsRef = await GetAllDocument("documents", role);

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
    }, [user, pageType, isReloadPage]);

    if (isReloadPage) return <Skeleton />;

    return (
        <Card>
            <Card.Header className="h5">{`${projectText} ${docText}`}</Card.Header>
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
