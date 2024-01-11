import React from 'react'
import Container from "react-bootstrap/Container"; // Import Container
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Temp = () => {
  return (
<Container className="mt-5">
      {" "}
      {/* Wrap in Container and add margin-top */}
      <h2 className="text-center">Single Entry Form</h2>
      <Row className="g-2 my-3 w-80">
        <Col md>
          <FloatingLabel className="my-2" controlId="floatingInputGrid" label="Borrowers name">
            <Form.Control type="text" placeholder="Bucky Barnes" />
          </FloatingLabel>
          <FloatingLabel className="my-2" controlId="floatingInputGrid" label="Loan number">
            <Form.Control type="text" maxLength={10} placeholder="0000000000" />
          </FloatingLabel>
          {/* <FloatingLabel className="my-2" controlId="floatingInputGrid" label="Note Rate">
            <Form.Control type="text" maxLength={10} placeholder="0000000000" />
          </FloatingLabel> */}
        </Col>
        <Col md>
          <FloatingLabel className="my-2"
            controlId="floatingSelectGrid"
            label="ppr"
          >
            <Form.Select aria-label="Floating label select example">
              {/* <option selected >Current waterfall</option> */}
              <option value="X">X waterfall</option>
              <option value="Y">Y Waterfall</option>
              <option value="Z">Z waterfall</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel className="my-2" controlId="floatingInputGrid" label="Note Date">
            <Form.Control type="date"  placeholder="dd-mm-yyyy" />
          </FloatingLabel>
        </Col>
      </Row>
    </Container>
  )
}

export default Temp
