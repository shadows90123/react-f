import React from "react";
import { Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { router_locale } from "../../router_locale";

export default function Sidebar() {
    return (
        <Nav
            defaultActiveKey="/student"
            as="ul"
            className="flex-column text-light h-100 p-2 bg-dark"
        >
            <Nav.Item as="li">
                <Nav.Link href="/student" className="fs-4">
                    หน้าหลัก
                </Nav.Link>
            </Nav.Item>

            {router_locale["student"].map((item, index) => {
                return (
                    <Nav.Item as="li" key={index}>
                        <Nav
                            defaultActiveKey="/student"
                            as="ul"
                            className="flex-column mt-3"
                        >
                            <div className="mb-1">{item.text}</div>
                            {item.children.map((subItem) => {
                                return (
                                    <Link
                                        key={subItem.path}
                                        to={item.path + "/" + subItem.path}
                                        className="w-100 ms-2 mb-2 text-start text-decoration-none"
                                    >
                                        {subItem.text}
                                    </Link>
                                );
                            })}
                        </Nav>
                    </Nav.Item>
                );
            })}
        </Nav>
    );
}
