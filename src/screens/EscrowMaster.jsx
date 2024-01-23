import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

const EscrowMaster = () => {
  //   const history = useNavigate();
  const [master, setMaster] = useState([]);
  const tArray = new Array(40).fill();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/emaster")
      .then(function (response) {
        setMaster(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Container className="container-fluid text-center mt-5">
        <h2 className="my-5 fw-bold fs-1">Escrow Master</h2>
        <div>
          {tArray.length > 0 && (
            <Table striped responsive bordered hover>
              <thead>
                <tr className="table-dark">
                  <th>Item Name</th>
                  <th>Frequency</th>
                  <th>Escrow Type</th>
                  <th>Escrow Amount</th>
                  <th>Beneficiary Name</th>
                  <th>Bank Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tArray.map((index) => (
                  <tr key={index}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      {/* <Button
                        variant="danger"
                        size="sm"
                        style={{ zIndex: 2 }}
                        onClick={() => handleDelete(loan.id)}
                      >
                        Delete
                      </Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
    </>
  );
};

export default EscrowMaster;
