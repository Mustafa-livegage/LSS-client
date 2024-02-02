import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { MdSlideshow } from "react-icons/md";

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
  const [waterfalls, setWaterfalls] = useState([]);
  const [showWaterfalls, setShowWaterfalls] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWaterfalls = () => {
    axios
      .get("http://localhost:5000/api/Waterfall")
      .then((response) => {
        console.log(response.data);
        setWaterfalls(response.data);
      })
      // console.log(waterfalls.data)
      .catch((error) => {
        console.error("Error fetching waterfalls:", error);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchWaterfalls();
  }, []);

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
      <h1 className="text-center mb-5 fw-bold text-decoration-underline">
        Add Waterfalls
      </h1>
      <Row>
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
                required
              />
            </FloatingLabel>
            <Form.Group>
              <Form.Label className="fs-4 fw-bold">Select Hierarchy</Form.Label>
              {checkBoxOptions.map((type) => (
                <div className="d-flex flex-row align-items-center">
                  <Form.Check
                    key={type}
                    type="checkbox"
                    id={`${type}`}
                    checked={checkedCheckboxes.includes(type)}
                    onChange={() => handleCheckboxChange(type)}
                  />
                  <Form.Label className="fs-4 ms-3">{type}</Form.Label>
                </div>
              ))}
            </Form.Group>
            <Button className="mt-3" type="submit" variant="primary" block>
              Submit
            </Button>
          </Form>
          <Button
            className="mb-3"
            onClick={() => setShowWaterfalls(!showWaterfalls)}
            variant={showWaterfalls ? "outline-primary" : "primary"}
          >
            {showWaterfalls ? "Hide all Waterfalls" : "Show all Waterfalls"}
          </Button>
        </Col>
        <Col xs={10} md={8} lg={6} className="border-start bg-light p-4">
          <h3 className="mb-4">Selected Hierarchy (In-order)</h3>
          <ol className=" fs-4">
            {checkedCheckboxes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ol>
        </Col>
      </Row>
      {/* all waterfalls */}
      {showWaterfalls && (
        <div className="mt-3">
          <Accordion>
            {loading ? (
              <p>Loading...</p>
            ) : (
              waterfalls.map((waterfall) => (
                <Accordion.Item
                  className="mt-2"
                  eventKey={waterfall.id.toString()}
                >
                  <div key={waterfall.id}>
                    <Accordion.Header>
                      <h5 className="fw-bold">{waterfall.w_name}</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <strong className="fs-4">
                          Selected Hierarchy (In-order):
                        </strong>
                        <ol className="fs-5">
                          {waterfall.desc.map((type, index) => (
                            <li key={index}>{type}</li>
                          ))}
                        </ol>
                      </div>
                    </Accordion.Body>
                  </div>
                </Accordion.Item>
              ))
            )}
          </Accordion>
        </div>
      )}
    </Container>
  );
};

export default AddWaterfall;
