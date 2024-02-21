import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../libs/Firebase";
import Button from "react-bootstrap/Button";
import { IoIosLogOut } from "react-icons/io";
import "./HeaderT.css";

function HeaderStudent() {
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut();
        navigate("/");
    };
    return (
        <div className="HeaderT">
            <Navbar expand="lg" className="HeaderT">
                <Container>
                    <Navbar.Brand>
                        <Link to="/HomeStudent">หน้าหลัก </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link to="/HomeStudent">กรอกเอกสาร ป.1</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/HomeStudent">กรอกเอกสาร ป.2</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/HomeStudent">กรอกเอกสาร ป.3</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/HomeStudent">กรอกเอกสาร ป.4</Link>
                            </Nav.Link>
                        </Nav>
                        <Button
                            variant="light text-danger"
                            onClick={handleLogout}
                        >
                            Logout&nbsp;&nbsp;
                            <IoIosLogOut />
                        </Button>{" "}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default HeaderStudent;
