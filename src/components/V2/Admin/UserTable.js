import _ from "lodash";
import { useState, useEffect } from "react";
import { GetAllDocument } from "../../../libs/Firebase";
import { Card, Row, Table } from "react-bootstrap";
import Pagination from "../Pagination";
import FormUser from "../Form/User";

const Roles = {
    student: "นักศึกษา",
    teacher: "อาจารย์",
    president: "ประธาน",
    admin: "ผู้ดูแลระบบ",
};

export default function UserTable() {
    const [isReloadPage, setIsReloadPage] = useState(true);

    const [users, setUsers] = useState({});
    const [elTableUser, setElTableUser] = useState(<></>);

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

    const onReloadPage = () => {
        setIsReloadPage(true);
    };

    useEffect(() => {
        if (isReloadPage) {
            const fetchAll = async () => {
                const usersRef = await GetAllDocument("users");

                if (!_.isEmpty(usersRef)) {
                    setUsers(usersRef);
                    setTotalItems(_.keys(usersRef).length);
                    setElTableUser(<></>);
                    setCurrentPage(1);
                }

                setIsReloadPage(false);
            };

            fetchAll();
        }
    }, [isReloadPage]);

    useEffect(() => {
        if (!_.isEmpty(users)) {
            const arr = getItemOnPage(users);
            const arrDateSort = sortByDate(arr, users, "asc", "created_at");

            setElTableUser(
                <>
                    {arrDateSort.map((key, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{users[key].name}</td>
                                <td>{users[key].email}</td>
                                <td>{Roles[users[key].role]}</td>
                                <td>
                                    <FormUser
                                        userData={{ [key]: users[key] }}
                                        type="view"
                                        editorRole="admin"
                                        onReloadPage={onReloadPage}
                                    />
                                    <FormUser
                                        userData={{ [key]: users[key] }}
                                        type="edit"
                                        editorRole="admin"
                                        onReloadPage={onReloadPage}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </>
            );
        }
    }, [users, currentPage, isReloadPage]);

    return (
        <Card>
            <Card.Header>บัญชีผู้ใช้</Card.Header>
            <Card.Body>
                <Row className="mb-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ชื่อ-สกุล</th>
                                <th>อีเมล</th>
                                <th>บทบาท</th>
                                <th>
                                    <FormUser
                                        userData={{}}
                                        type="create"
                                        editorRole="admin"
                                        onReloadPage={onReloadPage}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>{elTableUser}</tbody>
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
            </Card.Body>
        </Card>
    );
}

const sortByDate = (arr, obj, order, property) => {
    // type = des / asc
    const sortArr = [];

    _.map(arr, (item, index) => {
        if (index + 1 < arr.length) {
            const nextItem = index + 1;
            const _compare1 = new Date(obj[item][property]);
            const _compare2 = new Date(obj[arr[nextItem]][property]);

            if (_.indexOf(sortArr, item) === -1) {
                sortArr.push(item);
            }

            if (order === "asc") {
                if (_compare1 > _compare2) {
                    sortArr.unshift(arr[nextItem]);
                } else {
                    sortArr.push(arr[nextItem]);
                }
            } else if (order === "des") {
                if (_compare1 < _compare2) {
                    sortArr.unshift(arr[nextItem]);
                } else {
                    sortArr.push(arr[nextItem]);
                }
            }
        }
    });

    if (_.isEmpty(sortArr)) {
        return arr;
    }

    return sortArr;
};

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
