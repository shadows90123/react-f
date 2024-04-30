import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { IoIosLogOut } from "react-icons/io";

import { logOut } from "../../libs/Firebase";

function Header() {
    return (
        <Navbar expand="lg" className="bg-dark">
            <Container>
                <Navbar.Brand className="text-light">
                    ระบบการกรอกแบบฟอร์มสอบปริญญานิพนธ์
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <Form className="d-flex">
                        <Button variant="light" size="sm" onClick={logOut}>
                            <IoIosLogOut /> ออกจากระบบ
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
