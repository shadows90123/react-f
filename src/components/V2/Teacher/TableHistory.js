import { useState, useEffect } from "react";
import _ from "lodash";
import Pagination from "../Pagination";
import { getDateLocale } from "../../../libs/DateParser";
import { getSubsetArray } from "../../../libs/coreFunc";
import { Table, Row } from "react-bootstrap";
import DocForm from "../Form/LayoutForm";

export default function TableData({ _docs, _meta, _onReloadPage }) {
    const [docs, setDocs] = useState({});
    const [elTableData, setElTableData] = useState(<></>);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
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

        const { docType } = _meta;

        setElTableData(
            <>
                {docsArr.map((key, index) => {
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
                                    <DocForm
                                        type="view"
                                        owner={{ uid: docs[key].owner_id }}
                                        docs={{ [key]: docs[key] }}
                                        meta={_meta}
                                        onReloadPage={_onReloadPage}
                                    />
                                ) : docType.startsWith("2") ? (
                                    <DocForm
                                        type="view"
                                        owner={{ uid: docs[key].owner_id }}
                                        docs={{ [key]: docs[key] }}
                                        meta={_meta}
                                        onReloadPage={_onReloadPage}
                                    />
                                ) : docType.startsWith("3") ? (
                                    <DocForm
                                        type="view"
                                        owner={{ uid: docs[key].owner_id }}
                                        docs={{ [key]: docs[key] }}
                                        meta={_meta}
                                        onReloadPage={_onReloadPage}
                                    />
                                ) : docType.startsWith("4") ? (
                                    <DocForm
                                        type="view"
                                        owner={{ uid: docs[key].owner_id }}
                                        docs={{ [key]: docs[key] }}
                                        meta={_meta}
                                        onReloadPage={_onReloadPage}
                                    />
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
