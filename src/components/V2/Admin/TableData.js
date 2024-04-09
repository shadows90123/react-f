import { useState, useEffect } from "react";
import _ from "lodash";
import { Table, Row } from "react-bootstrap";

import { getDateLocale } from "../../../libs/DateParser";
import { getSubsetArray, sortDocByDate } from "../../../libs/coreFunc";

import Pagination from "../Pagination";
import Document1 from "../Form/Document1";
import Document2 from "../Form/Document2";
import Document3 from "../Form/Document3";
import Document4 from "../Form/Document4";

export default function TableData({ _docs, _meta, _onReloadPage }) {
    const [meta] = useState(_meta);
    const [docs, setDocs] = useState({});
    const [elTableData, setElTableData] = useState(<></>);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);
    const [totalItems, setTotalItems] = useState(0);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const getItemOnPage = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = currentPage * itemsPerPage;
        return getSubsetArray(_.keys(data), startIndex, endIndex);
    };

    useEffect(() => {
        const docsArr = getItemOnPage(docs);
        const currentSortByDate = sortDocByDate(
            docsArr,
            docs,
            "president",
            "asc"
        );

        const { docType } = meta;

        setElTableData(
            <>
                {currentSortByDate.map((key, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{docs[key].doc_form.projectName}</td>
                            <td>
                                {getDateLocale(
                                    docs[key].approved["teacher"].updated_at
                                )}
                            </td>
                            <td>
                                {docType.startsWith("1") ? (
                                    <>
                                        <Document1
                                            type="view"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                        <Document1
                                            type="edit"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                        <Document1
                                            type="delete"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                    </>
                                ) : docType.startsWith("2") ? (
                                    <>
                                        <Document2
                                            type="view"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                        <Document2
                                            type="edit"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                        <Document2
                                            type="delete"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                    </>
                                ) : docType.startsWith("3") ? (
                                    <>
                                        <Document3
                                            type="view"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                        <Document3
                                            type="edit"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                        <Document3
                                            type="delete"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                    </>
                                ) : docType.startsWith("4") ? (
                                    <>
                                        <Document4
                                            type="view"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                        <Document4
                                            type="edit"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                        <Document4
                                            type="delete"
                                            owner={{ uid: docs[key].owner_id }}
                                            docs={{ [key]: docs[key] }}
                                            meta={meta}
                                            onReloadPage={_onReloadPage}
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    }, [docs, currentPage]);

    useEffect(() => {
        if (!_.isEmpty(_docs)) {
            setDocs(_docs);
            setTotalItems(_.keys(_docs).length);
            setCurrentPage(1);
        }
    }, [_docs]);

    return (
        <>
            <Row className="mb-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>โครงการ</th>
                            <th>วันที่</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{elTableData}</tbody>
                </Table>
            </Row>
            <Row className="mb-2">
                <Pagination
                    _currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                />
            </Row>
        </>
    );
}
