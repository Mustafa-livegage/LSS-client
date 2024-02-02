import { Button, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { MdLogout } from "react-icons/md";
import React from "react";

function NavBar() {
  const { logout, auth } = useAuth();

  const adminPaths = [
    { name: "Register", path: "/adduser" },
    { name: "Escrow Master", path: "/escrow-master" },
    { name: "Add Waterfall", path: "/addwaterfall" },
  ];
  const userPaths = [
    { name: "Add Loans", path: "/addloans" },
    { name: "Payment", path: "/payment" },
  ];

  const handleLogout = () => {
    logout();
  };
  return (
    <Navbar expand="lg" className="bg-dark">
      <Nav className="container-fluid px-5">
        <Link to={auth.role == "admin" ? "/users" : "/"}>
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
            {auth.role == "admin"
              ? adminPaths.map((path, index) => (
                  <React.Fragment key={index}>
                    <Link to={path.path} className="text-decoration-none">
                      <Navbar.Text className="text-white fs-4 ">
                        {path.name}
                      </Navbar.Text>
                    </Link>
                    <div className="border-end border-secondary border-3 mx-3" />
                  </React.Fragment>
                ))
              : userPaths.map((path, index) => (
                  <React.Fragment key={index}>
                    <Link to={path.path} className="text-decoration-none">
                      <Navbar.Text className="text-white fs-4 ">
                        {path.name}
                      </Navbar.Text>
                    </Link>
                    <div className="border-end border-secondary border-3 mx-3" />
                  </React.Fragment>
                ))}
            <Button
              variant="outline-danger"
              className="fs-5 btn-sm d-flex align-items-center justify-content-between"
              onClick={handleLogout}
            >
              Logout <MdLogout className="ms-2" />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
