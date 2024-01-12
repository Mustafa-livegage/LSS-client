import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const SingleEntryForm = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-6 mx-2">
          <h2 className="text-center">Board loan</h2>
          <Container className="mt-5">
            {" "}
            {/* Wrap in Container and add margin-top */}
            <form  className="text-center">
            <Row className="g-2 my-3 w-80">
              <Col md>
                <FloatingLabel
                  className="my-2"
                  controlId="floatingInputGrid"
                  label="Borrowers name"
                >
                  <Form.Control type="text" placeholder="Bucky Barnes" />
                </FloatingLabel>
                <FloatingLabel
                  className="my-2"
                  controlId="floatingInputGrid"
                  label="Loan number"
                >
                  <Form.Control
                    type="text"
                    maxLength={10}
                    placeholder="0000000000"
                  />
                </FloatingLabel>


                <div className="form-floating my-2">
                  <input
                    type="number"
                    className="form-control"
                    id="note-rate"
                    placeholder="0.00"
                    step={0.01}
                  />
                  <label htmlFor="note-rate">Note Rate</label>
                </div>

                <div className="form-floating my-2">
                  <input
                    type="number"
                    className="form-control"
                    id="upb-amount"
                    placeholder="900000"
                    step={0.01}
                  />
                  <label htmlFor="upb-amount">UPB Amount</label>
                </div>

                <div className="form-floating my-2">
                  <input
                    type="number"
                    className="form-control"
                    id="curr-int-rate"
                    placeholder="0.00"
                    step={0.01}
                  />
                  <label htmlFor="curr-int-rate">Current Intrest Rate</label>
                </div>
                <div className="form-floating my-2">
                  <input
                    type="number"
                    className="form-control"
                    id="pi-pmt-amt"
                    placeholder="900000"
                    step={0.01}
                  />
                  <label htmlFor="pi-pmt-amt">PI Principal Amount</label>
                </div>

              </Col>
              <Col md>
                <FloatingLabel
                  className="my-2"
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
                <FloatingLabel
                  className="my-2"
                  controlId="floatingInputGrid"
                  label="Note Date"
                >
                  <Form.Control type="date" placeholder="dd-mm-yyyy" />
                </FloatingLabel>
                <FloatingLabel
                  className="my-2"
                  controlId="floatingInputGrid"
                  label="Loan Boarding Date"
                >
                  <Form.Control type="date" placeholder="dd-mm-yyyy" />
                </FloatingLabel>

                <FloatingLabel
                  className="my-2"
                  controlId="floatingInputGrid"
                  label="Next Payment Due Date"
                >
                  <Form.Control type="date" placeholder="dd-mm-yyyy" />
                </FloatingLabel>

                <div className="form-floating my-2">
                  <input
                    type="number"
                    className="form-control"
                    id="t-and-i-pmt-amt"
                    placeholder="900000"
                    step={0.01}
                  />
                  <label htmlFor="t-and-i-pmt-amt">Tax and Insurnace Amount</label>
                </div>
                <div className="form-floating my-2">
                  <input
                    type="number"
                    className="form-control"
                    id="total-pmt-amt"
                    placeholder="900000"
                    step={0.01}
                  />
                  <label htmlFor="total-pmt-amt">Total payment Amount</label>
                </div>

              </Col>

            </Row>
            <button className="btn btn-outline-dark text-center  ">Submit</button>
            </form>
          </Container>
        </div>
        <div className="col  mx-2 d-flex flex-column  align-items-center justify-content-center ">
          <input
            className="btn btn-outline-dark "
            type="file"
            name="upload"
            id="upload"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleEntryForm;
