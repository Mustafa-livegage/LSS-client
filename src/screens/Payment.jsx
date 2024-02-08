import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";

import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { formatCurrency } from "../helper/formatCurrency";

const Payment = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]); // [loan, setLoan]
  const [distribution, setDistribution] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);

  const date = new Date().toString().slice(0, 24);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    mop: "Wire",
    c_name: "",
    bank_name: "",
    account_number: "",
    route_number: "",
    pmt_amt: 0,
    date_time: date,
    loan_id: id,
  });
  const formRef = useRef();

  const fetchHistory = () => {
    axios
      .get(`http://localhost:5000/api/history/${id}`)
      .then((response) => {
        setHistory(response.data.reverse());
        setFilteredHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const showAlert = (variant, message) => {
    setAlertMessage({ variant, message });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/history", formData)
      .then(() => {
        console.log(formData);
        showAlert("success", "Single loan entry submitted successfully!");
        fetchHistory();
      })
      .catch((error) => {
        showAlert("danger", "Error submitting loan entry.");
      });
    axios
      .put(`http://localhost:5000/api/payment/${id}?pmt=${formData.pmt_amt}`)
      .then((response) => {
        setDistribution(response.data);
        setLoading(false);
        formRef.current.reset();
        showAlert("success", "Payment Done!!");
      })
      .catch((error) => {
        showAlert(
          "danger",
          "Some error occured while processing your payment."
        );
      });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio" && checked) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timeOutId = setTimeout(() => {
        setAlertMessage(null);
      }, 4000);

      return () => clearTimeout(timeOutId);
    }
  }, [alertMessage]);

  const handleSearch = () => {
    setFilteredHistory(
      history.filter((loan) => loan.c_name.toString().includes(searchTerm))
    );
  };

  return (
    <>
      <BackButton />
      <Container>
        <Alert
          className="mt-1"
          variant={alertMessage?.variant}
          show={!!alertMessage}
          onClose={() => {
            setAlertMessage(null);
          }}
        >
          {alertMessage?.message}
        </Alert>
        <Container className="container-fluid">
          <h1 className="text-center mb-5 fw-bold text-decoration-underline ">
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
                    name="mop"
                    value="Wire"
                    id="option-1"
                    onChange={handleInputChange}
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="mop"
                    id="option-2"
                    value="ACH"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="option-1" className="option option-1">
                    <span>Wire</span>
                  </label>
                  <label htmlFor="option-2" className="option option-2">
                    <span>ACH</span>
                  </label>
                </div>
                <FloatingLabel controlId="name" label="Name" className="mb-3">
                  <Form.Control
                    onChange={handleInputChange}
                    name="c_name"
                    required
                    type="text"
                    placeholder="John Doe "
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="bank_name"
                  label="Bank Name"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={handleInputChange}
                    name="bank_name"
                    required
                    type="text"
                    placeholder="XYZ bank"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="acc_num"
                  label="Account Number"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={handleInputChange}
                    name="account_number"
                    min={1000000000}
                    max={9999999999}
                    required
                    type="number"
                    placeholder="0000000000"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="Routing_number"
                  label="Routing  Number"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={handleInputChange}
                    name="route_number"
                    min={100000000}
                    max={999999999}
                    required
                    type="number"
                    placeholder="0000000000"
                  />
                </FloatingLabel>

                {/* important */}
                <FloatingLabel
                  controlId="payment_amt"
                  label="Enter amount to be paid"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={handleInputChange}
                    name="pmt_amt"
                    type="number"
                    min={1}
                    step={0.01}
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
                <div className="mt-5">
                  <h4 className="text-center">
                    (Payment Distribution will be shown once the payment is
                    done.)
                  </h4>
                </div>
              )}
            </Col>
          </Row>
          <Container className="mt-5">
            <h2 className="opacity-75 ">Payment History</h2>
            {history.length > 0 && (
              <div className="w-25">
                <InputGroup className="mt-1 mb-3">
                  <Form.Control
                    placeholder="Enter Customer name"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <Button
                    className="mx-3 rounded"
                    variant="dark"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </InputGroup>
              </div>
            )}

            {filteredHistory.length > 0 ? (
              <div>
                <Table striped responsive className="text-center mt-1">
                  <thead>
                    <tr className="table-dark">
                      <th>S.No.</th>
                      <th>Transaction Id</th>
                      <th> Name</th>
                      <th> Date & Time</th>
                      <th> Amount</th>
                      <th>Bank Name</th>
                      <th> Account Number</th>
                      <th> Route Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((his, index) => (
                      <tr key={his.id}>
                        <td className="fw-bold" style={{ width: "25px" }}>
                          {index + 1}.
                        </td>
                        <td>{his.id}</td>
                        <td>{his.c_name}</td>
                        <td>{his.date_time}</td>
                        <td>{formatCurrency(his.pmt_amt)}</td>
                        <td>{his.bank_name}</td>
                        <td>{his.account_number}</td>
                        <td>{his.route_number}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <h3>No Payment history found!!</h3>
            )}
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Payment;
