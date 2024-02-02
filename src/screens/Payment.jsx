import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  const [amt, setAmt] = useState();
  const [loan, setLoan] = useState();
  const [distribution, setDistribution] = useState([]);

  const fetchLoans = () => {
    axios
      .get(`http://localhost:5000/api/loans/${id}`)
      .then((response) => {
        // console.log(response.data);
        setLoan(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = { ...loan, last_pmt_amount: parseInt(amt) };

    axios
      .put(`http://localhost:5000/api/payment/${id}`, updated)
      .then((response) => {
        setDistribution(response.data);
      })
      .catch((error) => {
        console.error("Error in PUT request:", error);
      });
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setAmt(value);
  };
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-center fw-bold">Make Payment</h1>
        <Row>
          <Col md={8}>
            <h2 className="fw-bold">Payment Details</h2>
            <Form onSubmit={handleSubmit} className="w-50 text-center ">
              <Form.Select className="mb-3" size="lg" required>
                <option disabled selected value="#">
                  Mode of payment
                </option>
                <option value="1">Net Banking</option>
                <option value="2">PQR</option>
                <option value="3">XYZ</option>
              </Form.Select>
              <FloatingLabel controlId="name" label="Name" className="mb-3">
                <Form.Control required type="text" placeholder="John Doe " />
              </FloatingLabel>
              <FloatingLabel
                controlId="bank_name"
                label="Bank Name"
                className="mb-3"
              >
                <Form.Control required type="text" placeholder="XYZ bank" />
              </FloatingLabel>
              <FloatingLabel
                controlId="acc_num"
                label="Account Number"
                className="mb-3"
              >
                <Form.Control required type="number" placeholder="0000000000" />
              </FloatingLabel>
              <FloatingLabel
                controlId="Routing_number"
                label="Routing  Number"
                className="mb-3"
              >
                <Form.Control required type="number" placeholder="0000000000" />
              </FloatingLabel>

              {/* important */}
              <FloatingLabel
                controlId="payment_amt"
                label="Enter amount to be paid"
                className="mb-3"
              >
                <Form.Control
                  name="payment_amount"
                  value={amt}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="500 $"
                  required
                />
              </FloatingLabel>
              <Button type="submit">make payment</Button>
            </Form>
          </Col>
          <Col className="ms-3 bordered bg-light  mb-4">
            <h1 className="fw-bold ">Payment Distribution</h1>

            <h3 className="mt-2 fw-bold">Amount Paid: $ {amt}</h3>
            <table>
              <thead>
                <tr className="table-dark">
                  <th>Item</th>
                  <th>Amount Distributed</th>
                </tr>
                <tbody className="d-flex flex-column justify-content-end ">
                  <tr>
                    <td>UPB Amount::</td>
                    <td>{distribution.upb_amount}</td>
                  </tr>
                  <tr>
                    <td>Interest Amount::</td>
                    <td>{distribution.interest_amount}</td>
                  </tr>
                  <tr>
                    <td>Principal Amount::</td>
                    <td>{distribution.principal_amount}</td>
                  </tr>
                  <tr>
                    <td>Escrow Amount::</td>
                    <td>{distribution.escrow}</td>
                  </tr>
                  <tr>
                    <td>Late Fees::</td>
                    <td>{distribution.late_fee}</td>
                  </tr>
                  <tr>
                    <td>Extra Principal::</td>
                    <td>{distribution.e_principal}</td>
                  </tr>
                  <tr>
                    <td>Suspense::</td>
                    <td>{distribution.suspense}</td>
                  </tr>
                </tbody>
              </thead>
            </table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Payment;
