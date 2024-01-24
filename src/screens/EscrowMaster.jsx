import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import BankDetailsModal from "../components/BankDetailsModal";
import { BiSolidShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const EscrowMaster = () => {
  //   const history = useNavigate();
  const [master, setMaster] = useState([]);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [escrowId, setEscrowId] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/emaster")
      .then(function (response) {
        setMaster(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleShowBankDetails = (id) => {
    setShowBankDetails(true);
    setEscrowId(id);
  };
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this escrow service?"
    );

    if (isConfirmed) {
      axios
        .delete(`http://localhost:5000/api/emaster/${id}`)
        .then((response) => {
          // Remove the deleted loan from the state
          setMaster((prevEscrows) =>
            prevEscrows.filter((escrow) => escrow.id !== id)
          );
        })
        .catch((error) => {
          console.error(`Error deleting loan with ID ${id}:`, error);
        });
    }
  };
  return (
    <>
      <Container className="container-fluid text-center mt-5">
        <h2 className="my-5 fw-bold fs-1">Escrow Master</h2>
        <div>
          {master.length > 0 && (
            <>
              <Table striped responsive bordered hover>
                <thead>
                  <tr className="table-dark">
                    <th>Item Name</th>
                    <th>Frequency</th>
                    <th>Escrow Type</th>
                    <th>Escrow Amount</th>
                    <th>Mode of Payment</th>
                    <th>Bank Details</th>
                  </tr>
                </thead>
                <tbody>
                  {master.map((m) => (
                    <tr key={m.id}>
                      <td>{m.item_name}</td>
                      <td>{m.freq}</td>
                      <td>{m.escrow_type}</td>
                      <td>{m.amt}</td>
                      <td>{m.mop}</td>
                      <td>
                        <div
                          className="btn btn-sm btn-primary"
                          onClick={() => handleShowBankDetails(m.id)}
                        >
                          <BiSolidShow />
                        </div>
                        <div
                          className="btn btn-sm btn-danger mx-2"
                          onClick={() => handleDelete(m.id)}
                        >
                          <MdDeleteForever />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <BankDetailsModal
                showModal={showBankDetails}
                handleClose={() => setShowBankDetails(false)}
                id={escrowId}
              />
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default EscrowMaster;
