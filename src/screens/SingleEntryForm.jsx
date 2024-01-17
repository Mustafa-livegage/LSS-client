import React, { useCallback, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import validateLoanData from "../helper/validateLoanData";
import { useNavigate } from "react-router-dom";
import { Alert, InputGroup, Tab, Tabs } from "react-bootstrap";
import BackButton from "../components/BackButton";
import validateLoanDataOne from "../helper/validateLoanDataOne";

const SingleEntryForm = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    loan_number: "",
    note_date: "",
    note_rate: "",
    boarding_date: "",
    upb_amount: "",
    current_rate: "",
    pmt_due_date: "",
    principal_intrest: "",
    tax_insurance: "",
    pmt_amount: "",
    name: "",
    ppr: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);

  const formRef = useRef();

  const showAlert = (variant, message) => {
    setAlertMessage({ variant, message });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validateLoanDataOne(formData);

    axios
      .post("http://localhost:5000/api/loans", formData)
      .then((response) => {
        showAlert("success", "Single loan entry submitted successfully!");
      })
      .catch((error) => {
        showAlert("danger", "Error submitting loan entry.");
      });
    formRef.current.reset();
  };
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return year + "-" + month + "-" + day;
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const formattedData = result.data.map((row) => {
            row.note_date = parseDate(row.note_date);
            row.boarding_date = parseDate(row.boarding_date);
            row.pmt_due_date = parseDate(row.pmt_due_date);
            return row;
          });

          const validationErrors = validateLoanData(formattedData); // Validate formatted data

          if (validationErrors.length > 0) {
            // Display validation errors to the user
            alert(validationErrors.join("\n"));
            return; // Prevent API call
          } else {
            axios
              .post("http://localhost:5000/api/loans/Bulk", formattedData)
              .then((response) => {
                showAlert("success", "CSV Data Added Successfully!");
              })
              .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 400) {
                  alert(
                    "Your Data is not Saved. \nThere are errors in the data.\n Please review and correct them."
                  );
                }

                showAlert("danger", "Error adding CSV data.");
              });
          }
        },
      });
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <BackButton />
      <div className="container my-5" style={{ height: "80vh" }}>
        <Alert
          variant={alertMessage?.variant}
          show={!!alertMessage}
          onClose={() => {
            setAlertMessage(null);
            history("/");
          }}
          dismissible
        >
          {alertMessage?.message}
        </Alert>

        <h2 className="text-center fw-bold fs-1 mb-5">Board loan</h2>
        <Tabs defaultActiveKey="upload" className="mb-3" fill>
          <Tab eventKey="form" title="Form">
            <Container className="px-0">
              <form
                className="text-center h-100"
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <Row className="g-2 gx-2">
                  <Col md>
                    <FloatingLabel
                      className="my-4"
                      controlId="floatingInputGrid"
                      label="Borrowers name"
                    >
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Bucky Barnes"
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      className="my-4"
                      controlId="floatingInputGrid"
                      label="Loan number"
                    >
                      <Form.Control
                        type="text"
                        name="loan_number"
                        maxLength={10}
                        placeholder="0000000000"
                        onChange={handleChange}
                      />
                    </FloatingLabel>

                    <div className="form-floating my-4">
                      <input
                        type="number"
                        className="form-control"
                        id="note-rate"
                        placeholder="0.00"
                        step={0.01}
                        onChange={handleChange}
                        name="note_rate"
                      />
                      <label htmlFor="note-rate">Note Rate</label>
                    </div>

                    <div className="form-floating my-4">
                      <input
                        type="number"
                        className="form-control"
                        id="upb-amount"
                        placeholder="900000"
                        step={0.01}
                        onChange={handleChange}
                        name="upb_amount"
                      />
                      <label htmlFor="upb-amount">UPB Amount</label>
                    </div>

                    <div className="form-floating my-4">
                      <input
                        type="number"
                        className="form-control"
                        id="curr-int-rate"
                        placeholder="0.00"
                        step={0.01}
                        onChange={handleChange}
                        name="current_rate"
                      />
                      <label htmlFor="curr-int-rate">
                        Current Intrest Rate
                      </label>
                    </div>
                    <div className="form-floating my-4">
                      <input
                        type="number"
                        className="form-control"
                        id="pi-pmt-amt"
                        placeholder="900000"
                        step={0.01}
                        onChange={handleChange}
                        name="principal_intrest"
                      />
                      <label htmlFor="pi-pmt-amt">Principal and Interest</label>
                    </div>
                  </Col>
                  <Col md>
                    <FloatingLabel
                      className="my-4"
                      controlId="floatingSelectGrid"
                      label="ppr"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        onChange={handleChange}
                        name="ppr"
                      >
                        {/* <option selected >Current waterfall</option> */}
                        <option value="X waterfall">X waterfall</option>
                        <option value="Y waterfall">Y Waterfall</option>
                        <option value="Z waterfall">Z waterfall</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      className="my-4"
                      controlId="floatingInputGrid"
                      label="Note Date"
                    >
                      <Form.Control
                        type="date"
                        placeholder="dd-mm-yyyy"
                        onChange={handleChange}
                        name="note_date"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      className="my-4"
                      controlId="floatingInputGrid"
                      label="Loan Boarding Date"
                    >
                      <Form.Control
                        type="date"
                        placeholder="dd-mm-yyyy"
                        onChange={handleChange}
                        name="boarding_date"
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      className="my-4"
                      controlId="floatingInputGrid"
                      label="Next Payment Due Date"
                    >
                      <Form.Control
                        type="date"
                        placeholder="dd-mm-yyyy"
                        onChange={handleChange}
                        name="pmt_due_date"
                      />
                    </FloatingLabel>

                    <div className="form-floating my-4">
                      <input
                        type="number"
                        className="form-control"
                        id="t-and-i-pmt-amt"
                        placeholder="900000"
                        step={0.01}
                        onChange={handleChange}
                        name="tax_insurance"
                      />
                      <label htmlFor="t-and-i-pmt-amt">
                        Tax and Insurance Amount
                      </label>
                    </div>
                    <div className="form-floating my-4">
                      <input
                        type="number"
                        className="form-control"
                        id="total-pmt-amt"
                        placeholder="900000"
                        step={0.01}
                        onChange={handleChange}
                        name="pmt_amount"
                      />
                      <label htmlFor="total-pmt-amt">
                        Total payment Amount
                      </label>
                    </div>
                  </Col>
                </Row>
                <button className="btn btn-dark text-center w-50 mt-5">
                  Submit
                </button>
              </form>
            </Container>
          </Tab>
          <Tab eventKey="upload" title="Upload">
            <Container
              className="my-5 py-2 bg-white"
              {...getRootProps()}
              style={{ border: "3px dashed #999" }}
            >
              <div>
                <input {...getInputProps()} />
                <h5 className="text-center">
                  drag 'n' drop some files here, or click to select files
                </h5>
              </div>
            </Container>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default SingleEntryForm;
