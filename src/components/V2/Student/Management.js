import _ from "lodash";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePageType } from "../../../hooks/usePageType";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import { getMainPathText, getSubPathText } from "../../../libs/coreFunc";
import { auth, GetAllDocument } from "../../../libs/Firebase";

import State from "./State";
import DocForm from "../Form/LayoutForm";

export default function DocumentStudent() {
    const [user] = useAuthState(auth);
    const [pageType] = usePageType();
    const [manageElem, setManageElem] = useState(<></>);
    const [stateElem, setStateElem] = useState(<></>);
    const [isReloadPage, setIsReloadPage] = useState(false);

    // Project & Document Type
    const [projectType, setProjectType] = useState(null);
    const [docType, setDocType] = useState(null);

    // Project & Document Text
    const [projectText, setProjectText] = useState("");
    const [docText, setDocText] = useState("");

    const [docs, setDocs] = useState({});
    const [docOptCondition, setDocOptCondition] = useState({});

    const onReloadPage = () => {
        setIsReloadPage(true);
    };

    const setOptions = (_docMeta, project, document) => {
        const projectType = project;
        const docType = document;

        const _projectType = _docMeta.project_type;
        const _docType = _docMeta.doc_type;

        const isExistDoc = (pType, dType) => {
            return _projectType === pType && _docType === dType;
        };

        const _opt = {
            canCreate: false,
            canEdit: false,
            canDelete: false,
            canApprove: false,
            canDownload: false,
        };

        if (projectType === "1" && docType === "1") {
            // Project 1 / Document 1
            const isExist = isExistDoc("1", "1");
            _opt.canCreate = !isExist;
            _opt.canEdit = isExist;
            _opt.canDelete = isExist;
            _opt.canApprove = isExist;
            _opt.canDownload = isExist;
        } else if (projectType === "1" && docType === "2_1") {
            // Project 1 / Document 2_1
            const isExist = isExistDoc("1", "2_1");
            _opt.canCreate = isExistDoc("1", "1") && !isExist;
            _opt.canEdit = isExist;
            _opt.canDelete = isExist;
            _opt.canApprove = isExist;
            _opt.canDownload = isExist;
        } else if (projectType === "1" && docType === "2_2") {
            // Project 1 / Document 2_2
            const isExist = isExistDoc("1", "2_2");
            _opt.canCreate = !isExist;
            _opt.canEdit = isExist;
            _opt.canDelete = isExist;
            _opt.canApprove = isExist;
            _opt.canDownload = isExist;
        } else if (projectType === "2" && docType === "2_1") {
            // Project 2 / Document 2_1
            const isExist = isExistDoc("2", "2_1");
            _opt.canCreate = !isExist;
            _opt.canEdit = isExist;
            _opt.canDelete = isExist;
            _opt.canApprove = isExist;
            _opt.canDownload = isExist;
        } else if (projectType === "2" && docType === "2_2") {
            // Project 2 / Document 2_2
            const isExist = isExistDoc("2", "2_2");
            _opt.canCreate = !isExist;
            _opt.canEdit = isExist;
            _opt.canDelete = isExist;
            _opt.canApprove = isExist;
            _opt.canDownload = isExist;
        } else if (projectType === "2" && docType === "3") {
            // Project 2 / Document 3
            const isExist = isExistDoc("2", "3");
            _opt.canCreate = !isExist;
            _opt.canEdit = isExist;
            _opt.canDelete = isExist;
            _opt.canApprove = isExist;
            _opt.canDownload = isExist;
        } else if (projectType === "2" && docType === "4") {
            // Project 2 / Document 4
            const isExist = isExistDoc("2", "4");
            _opt.canCreate = !isExist;
            _opt.canEdit = isExist;
            _opt.canDelete = isExist;
            _opt.canApprove = isExist;
            _opt.canDownload = isExist;
        }

        return _opt;
    };

    useEffect(() => {
        const { project, document } = pageType;
        setProjectType(project);
        setDocType(document);
        if (project && document) {
            setProjectText(getMainPathText(project, "student"));
            setDocText(getSubPathText(project, document, "student"));
        }

        if (!_.isEmpty(user)) {
            const fetchAllDocMeta = async (project, document) => {
                const docsRef = await GetAllDocument("documents");
                let _docMeta = {};
                let _docOpt = {};

                _.keys(docsRef).map((key) => {
                    const item = docsRef[key];
                    if (item.owner_id === user?.uid) {
                        if (
                            item.project_type === project &&
                            item.doc_type === document
                        ) {
                            _docMeta = { ..._docMeta, [key]: item };
                            _docOpt = setOptions(item, project, document);
                        }
                    }
                });

                // Set for no documents
                if (!_.keys(_docOpt).length) {
                    _docOpt = {
                        canCreate: true,
                    };
                }

                setDocs(_docMeta);
                setDocOptCondition(_docOpt);
                setIsReloadPage(false);
            };

            fetchAllDocMeta(project, document);
        }
    }, [user, pageType, isReloadPage]);

    useEffect(() => {
        if (projectType && docType) {
            setStateElem(<State docs={docs} />);
            const _meta = { projectType, docType };
            setManageElem(
                <Card body className="mb-2">
                    <Card.Subtitle className="mb-2 text-muted">
                        เครื่องมือ
                    </Card.Subtitle>
                    {docType.startsWith("1") ? (
                        <>
                            <DocForm
                                disable={!(docOptCondition.canCreate ?? false)}
                                type="create"
                                owner={{ uid: user?.uid }}
                                docs={{}}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canEdit ?? false)}
                                type="edit"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canDelete ?? false)}
                                type="delete"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canApprove ?? false)}
                                type="approve"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={
                                    !(docOptCondition.canDownload ?? false)
                                }
                                type="download"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={() => {}}
                            />
                        </>
                    ) : docType.startsWith("2") ? (
                        <>
                            <DocForm
                                disable={!(docOptCondition.canCreate ?? false)}
                                type="create"
                                owner={{ uid: user?.uid }}
                                docs={{}}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canEdit ?? false)}
                                type="edit"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canDelete ?? false)}
                                type="delete"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canApprove ?? false)}
                                type="approve"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={
                                    !(docOptCondition.canDownload ?? false)
                                }
                                type="download"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={() => {}}
                            />
                        </>
                    ) : docType.startsWith("3") ? (
                        <>
                            <DocForm
                                disable={!(docOptCondition.canCreate ?? false)}
                                type="create"
                                owner={{ uid: user?.uid }}
                                docs={{}}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canEdit ?? false)}
                                type="edit"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canDelete ?? false)}
                                type="delete"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canApprove ?? false)}
                                type="approve"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={
                                    !(docOptCondition.canDownload ?? false)
                                }
                                type="download"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={() => {}}
                            />
                        </>
                    ) : docType.startsWith("4") ? (
                        <>
                            <DocForm
                                disable={!(docOptCondition.canCreate ?? false)}
                                type="create"
                                owner={{ uid: user?.uid }}
                                docs={{}}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canEdit ?? false)}
                                type="edit"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canDelete ?? false)}
                                type="delete"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={!(docOptCondition.canApprove ?? false)}
                                type="approve"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={onReloadPage}
                            />
                            <DocForm
                                disable={
                                    !(docOptCondition.canDownload ?? false)
                                }
                                type="download"
                                owner={{ uid: user?.uid }}
                                docs={docs}
                                meta={_meta}
                                onReloadPage={() => {}}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </Card>
            );
        }
    }, [docs, docOptCondition, user, projectType, docType]);

    if (isReloadPage) return <Skeleton />;

    return (
        <Card>
            <Card.Header className="h5">{`${projectText} ${docText}`}</Card.Header>
            <Card.Body>
                {stateElem}
                {manageElem}
            </Card.Body>
        </Card>
    );
}
