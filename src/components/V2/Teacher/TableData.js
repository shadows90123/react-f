import { useState, useEffect } from "react";
import _ from "lodash";
import Pagination from "../Pagination";
import { getDateLocale } from "../../../libs/DateParser";

import { Table, Row } from "react-bootstrap";

import Document1 from "../Form.Teacher/Document1";
import Document2 from "../Form.Teacher/Document2";
import Document3 from "../Form.Teacher/Document3";
import Document4 from "../Form.Teacher/Document4";

const getSubsetArray = (arr, start, end) => {
    if (!Array.isArray(arr)) {
        throw new Error("Input is not an array.");
    }

    const _start = start - 1;
    const _end = end - 1;

    if (_start < 0 || _start > _end) {
        throw new Error("Invalid start or end indices.");
    }

    if (_end >= arr.length) {
        return arr.slice(start - 1, arr.length + 1);
    }

    // Use Array.slice to get the subset array
    return arr.slice(_start, _end + 1);
};

const sortDocByDate = (docArr, docObj, type) => {
    // type = des / asc
    const sortByDate = [];

    _.map(docArr, (item, index) => {
        if (index + 1 < docArr.length) {
            const nextItem = index + 1;
            const _date1 = new Date(
                docObj[item].approved["teacher"].updated_at
            );
            const _date2 = new Date(
                docObj[docArr[nextItem]].approved["teacher"].updated_at
            );

            if (_.indexOf(sortByDate, item) === -1) {
                sortByDate.push(item);
            }

            if (type === "asc") {
                if (_date1 > _date2) {
                    sortByDate.unshift(docArr[nextItem]);
                } else {
                    sortByDate.push(docArr[nextItem]);
                }
            } else if (type === "des") {
                if (_date1 < _date2) {
                    sortByDate.unshift(docArr[nextItem]);
                } else {
                    sortByDate.push(docArr[nextItem]);
                }
            }
        }
    });

    if (_.isEmpty(sortByDate)) {
        return docArr;
    }

    return sortByDate;
};

export default function TableData({ _docs, _docType, _permission }) {
    const [docType, setDocType] = useState(_docType);
    const [permission, setPermission] = useState(_permission);

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
        const currentSortByDate = sortDocByDate(docsArr, docs, "asc");

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
                                    <Document1
                                        docs={{ [key]: docs[key] }}
                                        permission={permission}
                                    />
                                ) : docType.startsWith("2") ? (
                                    <Document2
                                        docs={{ [key]: docs[key] }}
                                        permission={permission}
                                    />
                                ) : docType.startsWith("3") ? (
                                    <Document3
                                        docs={{ [key]: docs[key] }}
                                        permission={permission}
                                    />
                                ) : docType.startsWith("4") ? (
                                    <Document4
                                        docs={{ [key]: docs[key] }}
                                        permission={permission}
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

    useEffect(() => {
        if (_docType !== null) {
            setDocType(_docType);
        }
        setPermission(_permission);
    }, [_docType, _permission]);

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
