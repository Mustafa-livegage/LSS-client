import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
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
              className="w-25 img-fluid"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
