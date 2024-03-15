import Button from "react-bootstrap/Button";
import { IoIosLogOut } from "react-icons/io";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOut } from "../../libs/Firebase";
const Header = () => {
    return (
        <div className="Header">
            <Navbar expand="lg" className="Header">
                <Container>
                    <Navbar.Brand>
                        <Link to="/AdminHome">Admin</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link to="/AdminHome">Add UserId Pass</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/AdminEditDoc">Edit Document</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/AdminEditUserId">
                                    Edit UserId Pass
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
