import React from "react";
import { Accordion, Container } from "react-bootstrap";

const ShowWaterfalls = ({ data, loading }) => {
  return (
    <Container>
      <div className="mt-3">
        <Accordion>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((waterfall, index) => (
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
                    </div>
                  </Accordion.Body>
                </div>
              </Accordion.Item>
            ))
          )}
        </Accordion>
      </div>
    </Container>
  );
};

export default ShowWaterfalls;
