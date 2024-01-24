import { Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Nav className="container-fluid px-5">
        <Link to="/">
          <Navbar.Brand>
            <img src="/assets/logo.png" alt="logo" className="w-25 img-fluid" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav
            className="ml-auto justify-content-end"
            style={{ width: "100%" }}
          >
            <Link to="/" className="text-decoration-none">
              <Navbar.Text className="text-white fs-4 ">Home</Navbar.Text>
            </Link>
            <div className="border-end border-secondary border-3 mx-3" />

            <Link to="/addloans" className="text-decoration-none">
              <Navbar.Text className="text-white fs-4 ">Board</Navbar.Text>
            </Link>
            <div className="border-end border-secondary border-3 mx-3" />
            <Link to="/escrow-master" className="text-decoration-none">
              <Navbar.Text className="text-white fs-4 ">
                Escrow Master
              </Navbar.Text>
            </Link>
            <div className="border-end border-secondary border-3 mx-3" />
          </Nav>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
