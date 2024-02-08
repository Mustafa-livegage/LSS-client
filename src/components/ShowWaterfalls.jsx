import axios from "axios";
import React from "react";
import { Accordion, Button, Container } from "react-bootstrap";

const ShowWaterfalls = ({ data }) => {
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this waterfall?"
    );

    if (isConfirmed) {
      axios
        .delete(`http://localhost:5000/api/waterfall/${id}`)
        .then((response) => {})
        .catch((error) => {
          console.error(
            `Error deleting waterfall with ID ${id}:`,
            error.response.data
          );
          alert(error.response.data);
        });
    }
  };
  return (
    <Container>
      <div className="mt-3">
        <Accordion>
          {data.map((waterfall, index) => (
            <Accordion.Item
              className="mt-2 w-50 mx-auto"
              eventKey={waterfall.id.toString()}
              key={index}
            >
              <div key={waterfall.id}>
                <Accordion.Header>
                  <h5 className="fw-bold">{waterfall.w_name}</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <strong className="fs-4">
                      Waterfall Hierarchy for{" "}
                      <strong className="border-bottom border-3 border-black ">
                        {waterfall.w_name}
                      </strong>
                    </strong>
                    <ol className="fs-5 my-2">
                      {waterfall.desc.map((type, index) => (
                        <li key={index}>{type}</li>
                      ))}
                    </ol>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(waterfall.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Accordion.Body>
              </div>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};

export default ShowWaterfalls;
