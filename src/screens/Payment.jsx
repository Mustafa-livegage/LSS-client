import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";

import { useParams } from "react-router-dom";
import { formatCurrency } from "../helper/formatCurrency";

const Payment = () => {
  const { id } = useParams();
  const [amt, setAmt] = useState();
  const [loan, setLoan] = useState();
  const [distribution, setDistribution] = useState({});
  const [loading, setLoading] = useState(true);
  const formRef = useRef();

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
        setLoading(false);
        formRef.current.reset();
        setAmt("");
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
      <Container className="container-fluid">
        <h1 className="text-center my-5 fw-bold text-decoration-underline ">
          Make Payment
        </h1>
        <Row className="gap-4">
          <Col className="p-3 bg-light col-7 rounded-4">
            <Form
              onSubmit={handleSubmit}
              className="text-center px-5 pt-5 pb-3"
              ref={formRef}
            >
              <div className="wrapper">
                <input
                  type="radio"
                  name="select"
                  id="option-1"
                  defaultChecked
                />
                <input type="radio" name="select" id="option-2" />
                <label htmlFor="option-1" className="option option-1">
                  <span>Wire</span>
                </label>
                <label htmlFor="option-2" className="option option-2">
                  <span>ACH</span>
                </label>
              </div>
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
              <Button type="submit" className="w-100">
                Pay
              </Button>
            </Form>
          </Col>
          <Col className="px-5 pt-3 bg-light rounded-4">
            <h3 className="fw-bold text-center">Payment Distribution</h3>
            {distribution.monthly_payment != undefined && (
              <h4 className="fw-bold">
                Amount Paid: {formatCurrency(distribution.monthly_payment)}
              </h4>
            )}
            {!loading ? (
              <Table className="mb-0" responsive bordered>
                <thead>
                  <tr className="table-dark">
                    <th>Item</th>
                    <th>Amount Distributed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Interest Amount</td>
                    <td>{formatCurrency(distribution.interest_amount)}</td>
                  </tr>
                  <tr>
                    <td>Principal Amount</td>
                    <td>{formatCurrency(distribution.principal_amount)}</td>
                  </tr>
                  <tr>
                    <td>Escrow Amount</td>
                    <td>{formatCurrency(distribution.escrow)}</td>
                  </tr>
                  <tr>
                    <td>Late Fees</td>
                    <td>{formatCurrency(distribution.late_fee)}</td>
                  </tr>
                  <tr>
                    <td>Extra Principal</td>
                    <td>{formatCurrency(distribution.e_principal)}</td>
                  </tr>

                  <tr>
                    <td>NSF (Non Sufficient Fee)</td>
                    <td>{formatCurrency(distribution.nsf)}</td>
                  </tr>
                  <tr>
                    <td>Extra Escrow</td>
                    <td>{formatCurrency(distribution.extra_escrow)}</td>
                  </tr>
                  <tr>
                    <td>Other fee</td>
                    <td>{formatCurrency(distribution.other_fee)}</td>
                  </tr>
                  <tr>
                    <td>Suspense</td>
                    <td>{formatCurrency(distribution.suspense)}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Payment;
