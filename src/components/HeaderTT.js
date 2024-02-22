import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../libs/Firebase";
import Button from "react-bootstrap/Button";
import { IoIosLogOut } from "react-icons/io";

const HeaderTT = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut();
        navigate("/");
    };
    return (
        <div>
            <div className="Header">
                <Navbar expand="lg" className="Header ">
                    <Container>
                        <Navbar.Brand>
                            <Link to="/HomeT">หน้าหลัก </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link></Nav.Link>
                                <Nav.Link></Nav.Link>
                                <Nav.Link></Nav.Link>
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
        </div>
    );
};

export default HeaderTT;
