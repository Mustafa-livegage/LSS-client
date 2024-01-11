import React from "react";
import "./HomePage.css";
import { Container, Form, InputGroup } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <Container className="homePageContainer">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Container>
    </>
  );
};

export default HomePage;
