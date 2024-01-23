import { Card, Container } from "react-bootstrap";
import { formatCurrency } from "../helper/formatCurrency";

const EscrowSchedule = ({ data, escrowAmt }) => {
  return (
    <>
      <Container className="mt-5">
        <div
          className="d-flex gap-4 flex-wrap align-items-start justify-content-start"
          style={{ margin: "50px" }}
        >
          {escrowAmt != 0 ? (
            <>
              {" "}
              {data.map((es) => (
                <Card
                  style={{ width: "19rem", borderRadius: "10px" }}
                  key={es.month}
                >
                  <Card.Header className=" text-center fw-bold ">
                    {es.month}
                  </Card.Header>
                  <Card.Body className="d-flex flex-column align-items-start justify-content-start">
                    <div className="row w-100 fw-bold ">
                      <div className="col-9">
                        <Card.Text>Monthly Payment</Card.Text>
                      </div>
                      <div className="col-3 text-start">
                        <Card.Text>
                          {escrowAmt <= 1200
                            ? formatCurrency(es.escrow)
                            : formatCurrency(es.escrow * 2)}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-9">
                        <Card.Text>County Tax</Card.Text>
                      </div>
                      <div className="col-3 text-start">
                        <Card.Text>
                          {escrowAmt <= 1200
                            ? formatCurrency(es.county_tax)
                            : formatCurrency(es.county_tax * 2)}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-9">
                        <Card.Text>District Tax </Card.Text>
                      </div>
                      <div className="col-3 text-start">
                        <Card.Text>
                          {escrowAmt <= 1200
                            ? formatCurrency(es.special_district_tax)
                            : formatCurrency(es.special_district_tax * 2)}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-9">
                        <Card.Text>Mortgage Insurance</Card.Text>
                      </div>
                      <div className="col-3 text-start">
                        <Card.Text>
                          {escrowAmt <= 1200
                            ? formatCurrency(es.mortgage_insurance)
                            : formatCurrency(es.mortgage_insurance * 2)}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-9">
                        <Card.Text>Hazard Insurance</Card.Text>
                      </div>
                      <div className="col-3 text-start">
                        <Card.Text>
                          {escrowAmt <= 1200
                            ? formatCurrency(es.hazard_insurance)
                            : formatCurrency(es.hazard_insurance * 2)}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-9">
                        <Card.Text>Flood Insurance</Card.Text>
                      </div>
                      <div className="col-3 text-start">
                        <Card.Text>
                          {escrowAmt <= 1200
                            ? formatCurrency(es.flood_insurance)
                            : formatCurrency(es.flood_insurance * 2)}
                        </Card.Text>
                      </div>
                    </div>
                    <div className="row w-100 fw-bold">
                      <div className="col-9">
                        <Card.Text>Balance</Card.Text>
                      </div>
                      <div className="col-3 text-start">
                        <Card.Text>
                          {escrowAmt <= 1200
                            ? formatCurrency(es.balance)
                            : formatCurrency(es.balance * 2)}
                        </Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <h1>This loan is not escrowed !!</h1>
          )}
        </div>
      </Container>
    </>
  );
};

export default EscrowSchedule;
