import { useState, useEffect } from "react";
import _ from "lodash";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { router_locale } from "../../router_locale";

export default function Sidebar() {
    let location = useLocation();
    const [role, setRole] = useState("");

    useEffect(() => {
        const { pathname } = location;
        if (pathname.includes("student")) {
            setRole("student");
        } else if (pathname.includes("teacher")) {
            setRole("teacher");
        } else if (pathname.includes("president")) {
            setRole("president");
        } else if (pathname.includes("admin")) {
            setRole("admin");
        }
    }, [location]);

    return (
        <Nav
            defaultActiveKey="/"
            as="ul"
            className="flex-column text-light h-100 p-2 bg-dark"
        >
            <Nav.Item as="li">
                <Nav.Link href="/" className="fs-4">
                    หน้าหลัก
                </Nav.Link>
            </Nav.Item>

            {role !== "" ? (
                router_locale[role].map((item, index) => {
                    return (
                        <Nav.Item as="li" key={index}>
                            <Nav
                                defaultActiveKey="/student"
                                as="ul"
                                className="flex-column mt-3"
                            >
                                {_.has(item, "children") ? (
                                    <>
                                        <div className="mb-1">
                                            {item?.icon && (
                                                <i
                                                    className={`fa-solid ${item.icon} fa-sm me-2`}
                                                ></i>
                                            )}
                                            {item.text}
                                        </div>
                                        {item.children.map((subItem) => {
                                            return (
                                                <Link
                                                    key={subItem.path}
                                                    to={
                                                        item.path +
                                                        "/" +
                                                        subItem.path
                                                    }
                                                    className={`w-100 my-1 p-1 bg-primary bg-opacity-${
                                                        location.pathname.includes(
                                                            `/${item.path}/${subItem.path}`
                                                        )
                                                            ? "50"
                                                            : "10"
                                                    } rounded text-white text-start text-decoration-none`}
                                                >
                                                    {subItem?.icon && (
                                                        <i
                                                            className={`fa-regular ${subItem.icon} fa-sm me-2`}
                                                        ></i>
                                                    )}
                                                    {subItem.text}
                                                </Link>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`w-100 my-1 p-1 bg-primary bg-opacity-${
                                            location.pathname.includes(
                                                `/${item.path}`
                                            )
                                                ? "50"
                                                : "10"
                                        } rounded text-white text-start text-decoration-none`}
                                    >
                                        {item?.icon && (
                                            <i
                                                className={`fa-regular ${item.icon} fa-sm me-2`}
                                            ></i>
                                        )}
                                        {item.text}
                                    </Link>
                                )}
                            </Nav>
                        </Nav.Item>
                    );
                })
            ) : (
                <></>
            )}
        </Nav>
    );
}
