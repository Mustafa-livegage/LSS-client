import React from "react";
import "./HomePage.css";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import Table from "../../components/Table/Table";

const HomePage = () => {
  return (
    <>
      <Container className="container-fluid text-center mt-5">
        {/* <InputGroup className="mb-3">
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup> */}
        <h2 className="fw-bold fs-1">Loan Servicing System</h2>

        <div className="w-100">

          <InputGroup className="my-5">

            <Form.Control
              placeholder="Loan number"
              aria-label=""
              aria-describedby="basic-addon2"
            />
           
          <Button className="mx-3 rounded" variant="dark">Search</Button>
          
          <Button variant="dark" className="rounded">Board</Button>
            
           
          </InputGroup>
        </div>
      </Container>
      {/* table here */}
      <Table/>
    </>
  );
};

export default HomePage;
