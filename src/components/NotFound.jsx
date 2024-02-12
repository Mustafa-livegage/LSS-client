import React from "react";
import { Container } from "react-bootstrap";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <Container className="vh-100  d-flex flex-column  align-items-center justify-content-center ">
      <TbError404 size={150} />
      <h1 className="fs-1 fw-bolder text-center">Error not found!!</h1>
    </Container>
  );
};

export default NotFound;
