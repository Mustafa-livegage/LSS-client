import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { BackButton } from "./BackButton";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-dark w-100">
      <Container className="mx-0 w-100">
        <Link to="/">
          <Navbar.Brand className="float-left">
            <img
              src="./assets/logo.png"
              alt="logo"
              className="img-fluid w-25"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="">
            <Nav.Link href="#home" className="text-light fs-5">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="text-light fs-5">
              Link
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
