import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import EditEscrowForm from "../components/EditEscrowForm";

const EscrowMaster = () => {
  const [master, setMaster] = useState([]);
  const [escrowId, setEscrowId] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEscrow, setSelectedEscrow] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/emaster")
      .then(function (response) {
        setMaster(response.data.reverse());
        setEscrowId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this escrow service?"
    );

    if (isConfirmed) {
      axios
        .delete(`http://localhost:5000/api/emaster/${id}`)
        .then((response) => {
          setMaster((prevEscrows) =>
            prevEscrows.filter((escrow) => escrow.id !== id)
          );
        })
        .catch((error) => {
          console.error(`Error deleting loan with ID ${id}:`, error);
        });
    }
  };

  const handleEdit = (escrow) => {
    setSelectedEscrow(escrow);
    setEditModalVisible(true);
  };

  const handleUpdate = (updatedEscrow) => {
    setMaster((prevEscrows) =>
      prevEscrows.map((escrow) =>
        escrow.id === updatedEscrow.id ? updatedEscrow : escrow
      )
    );
  };
  return (
    <>
      <Container className="container-fluid text-center mt-5">
        {editModalVisible && selectedEscrow && (
          <EditEscrowForm
            escrow={selectedEscrow}
            onUpdate={handleUpdate}
            onClose={() => setEditModalVisible(false)}
          />
        )}
        <h2 className="my-5 fw-bold fs-1">Escrow Master</h2>
        <div>
          {master.length > 0 && (
            <>
              <Table striped responsive bordered>
                <thead>
                  <tr className="table-dark">
                    <th>Item Name</th>
                    <th>Escrow Type</th>
                    <th>Mode of Payment</th>
                    <th>Beneficiary Name</th>
                    <th>Bank Details</th>
                    <th>Routing Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {master.map((m) => (
                    <tr key={m.id}>
                      <td>{m.item_name}</td>
                      <td>{m.escrow_type}</td>
                      <td>{m.mop}</td>
                      <td>{m.beneficiary_name}</td>
                      <td>
                        {m.bank_name} / {m.account_number}
                      </td>
                      <td>{m.route_number}</td>
                      <td>
                        <div
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEdit(m)}
                        >
                          <FaEdit />
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
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default EscrowMaster;
