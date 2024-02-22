import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOut } from "../../libs/Firebase";
import Button from "react-bootstrap/Button";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
    return (
        <div className="Header">
            <Navbar expand="lg" className="Header">
                <Container>
                    <Navbar.Brand>
                        <Link to="/teacher">หน้าหลัก </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link to="/teacher/document_1">
                                    กรอกเอกสาร ป.1
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/teacher/document_2">
                                    กรอกเอกสาร ป.2
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/teacher/document_3">
                                    กรอกเอกสาร ป.3
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/teacher/document_4">
                                    กรอกเอกสาร ป.4
                                </Link>
                            </Nav.Link>
                        </Nav>
                        <Button variant="light text-danger" onClick={logOut}>
                            Logout&nbsp;&nbsp;
                            <IoIosLogOut />
                        </Button>{" "}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
