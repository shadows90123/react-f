import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import Button from "react-bootstrap/Button";
import { IoIosLogOut } from "react-icons/io";
import "./Header_t.css";

function Header_studen() {
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut();
        navigate("/");
    };
    return (
        <div className="Header_t">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Link to="/Home">หน้าหลัก </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link to="/Docx1">กรอกเอกสาร ป.1</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/Docx2">กรอกเอกสาร ป.2</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/Docx3">กรอกเอกสาร ป.3</Link>
                            </Nav.Link>
                        </Nav>
                        <Button variant="primary" onClick={handleLogout}>
                            Logout&nbsp;&nbsp;
                            <IoIosLogOut />
                        </Button>{" "}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header_studen;
