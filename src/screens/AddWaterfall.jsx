import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

const checkBoxOptions = [
  "Interest",
  "Principal",
  "Escrow",
  "Late fee",
  "Extra Principal",
  "Extra Escrow",
  "NSF",
  "Other Fee",
  "Suspense",
];

const AddWaterfall = () => {
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleCheckboxChange = (type) => {
    if (checkedCheckboxes.includes(type)) {
      // If checkbox is already checked, uncheck it
      setCheckedCheckboxes(checkedCheckboxes.filter((item) => item !== type));
    } else {
      // If checkbox is not checked, check it
      setCheckedCheckboxes([...checkedCheckboxes, type]);
    }
  };

  const showAlert = (variant, message) => {
    setAlertMessage({ variant, message });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Log form data before resetting the state
    console.log("Form submitted with data:", name, checkedCheckboxes);
    axios
      .post("http://localhost:5000/api/waterfall", {
        w_name: name,
        desc: checkedCheckboxes,
      })
      .then((response) => {
        console.log(response.data);
        showAlert("success", "Your waterfall has been succesfully added!");
      })
      .catch((error) => {
        console.log(error);
        showAlert("danger", "Error! waterall data not added.");
      });

    // Reset form fields and selected checkboxes
    setName("");
    setCheckedCheckboxes([]);
  };

  return (
    <Container className="mt-5">
      <Alert
        variant={alertMessage?.variant}
        show={!!alertMessage}
        onClose={() => {
          setAlertMessage(null);
        }}
        dismissible
      >
        {alertMessage?.message}
      </Alert>
      <h1 className="text-center mb-4">Add Waterfall</h1>
      <Row className="">
        <Col xs={10} md={8} lg={6}>
          <Form onSubmit={handleSubmit} className="mb-4">
            <FloatingLabel
              controlId="waterfall_name"
              label="Waterfall Name"
              className="mb-3 col-7"
            >
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </FloatingLabel>
            <Form.Group>
              <Form.Label className="fs-4 fw-bold">Select Hierarchy</Form.Label>
              {checkBoxOptions.map((type) => (
                <Form.Check
                  key={type}
                  type="checkbox"
                  id={`${type}`}
                  label={`${type}`}
                  checked={checkedCheckboxes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                />
              ))}
            </Form.Group>
            <Button className="mt-3" type="submit" variant="primary" block>
              Submit
            </Button>
          </Form>
        </Col>
        <Col xs={10} md={8} lg={6} className="border-start bg-light p-4">
          <h1 className="mb-4">Selected Hierarchy (In-order)</h1>
          <ol className=" fs-5">
            {checkedCheckboxes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ol>
        </Col>
      </Row>
    </Container>
  );
};

export default AddWaterfall;
