import React, { useCallback, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

const SingleEntryForm = () => {
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
  const formRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/loans", formData)
      .then((response) => {
        console.log(response);
        console.log(formData.note_date);
      })
      .catch((error) => {
        console.log(error);
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
          });

          console.log(result.data[0]);
          axios
            .post("http://localhost:5000/api/loans/Bulk", result.data)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          // }
          // );
        },
      });
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="container my-5" style={{ height: "80vh" }}>
      <div className="row h-100">
        <div className="col-8 mx-2 h-100">
          <h2 className="text-center">Board loan</h2>
          <Container className="mt-5 h-100">
            {" "}
            {/* Wrap in Container and add margin-top */}
            <form
              className="text-center h-100"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <Row className="g-2 my-3">
                <Col md>
                  <FloatingLabel
                    className="my-5"
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
                    className="my-5"
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

                  <div className="form-floating my-5">
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

                  <div className="form-floating my-5">
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

                  <div className="form-floating my-5">
                    <input
                      type="number"
                      className="form-control"
                      id="curr-int-rate"
                      placeholder="0.00"
                      step={0.01}
                      onChange={handleChange}
                      name="current_rate"
                    />
                    <label htmlFor="curr-int-rate">Current Intrest Rate</label>
                  </div>
                  <div className="form-floating my-5">
                    <input
                      type="number"
                      className="form-control"
                      id="pi-pmt-amt"
                      placeholder="900000"
                      step={0.01}
                      onChange={handleChange}
                      name="principal_intrest"
                    />
                    <label htmlFor="pi-pmt-amt">PI Principal Amount</label>
                  </div>
                </Col>
                <Col md>
                  <FloatingLabel
                    className="my-5"
                    controlId="floatingSelectGrid"
                    label="ppr"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      onChange={handleChange}
                      name="ppr"
                    >
                      {/* <option selected >Current waterfall</option> */}
                      <option value="X">X waterfall</option>
                      <option value="Y">Y Waterfall</option>
                      <option value="Z">Z waterfall</option>
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel
                    className="my-5"
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
                    className="my-5"
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
                    className="my-5"
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

                  <div className="form-floating my-5">
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
                      Tax and Insurnace Amount
                    </label>
                  </div>
                  <div className="form-floating my-5">
                    <input
                      type="number"
                      className="form-control"
                      id="total-pmt-amt"
                      placeholder="900000"
                      step={0.01}
                      onChange={handleChange}
                      name="pmt_amount"
                    />
                    <label htmlFor="total-pmt-amt">Total payment Amount</label>
                  </div>
                </Col>
              </Row>
              <button className="btn btn-dark text-center w-50">Submit</button>
            </form>
          </Container>
        </div>
        <div
          className="col  mx-2 d-flex flex-column border border-dark align-items-center justify-content-center "
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    </div>
  );
};

export default SingleEntryForm;
