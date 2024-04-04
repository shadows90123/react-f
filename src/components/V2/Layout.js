import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <Container fluid className="min-vh-100">
            <Tab.Container defaultActiveKey="first">
                <Row className="vh-100">
                    <Col md={2} className="p-0">
                        <Sidebar />
                    </Col>
                    <Col md={10} className="p-0 bg-secondary">
                        <Header />
                        <div className="p-2">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}
