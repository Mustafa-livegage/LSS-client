import React from "react";
import { Container } from "react-bootstrap";
import { ImBlocked } from "react-icons/im";

const Unauthorized = () => {
  return (
    <Container className="vh-100  d-flex flex-column  align-items-center justify-content-center ">
      <div>
        <ImBlocked size={150} />
      </div>
      <br />
      <div>
        <h1 className="fs-1 fw-bolder ">Unauthorized</h1>
      </div>
    </Container>
  );
};

export default Unauthorized;
