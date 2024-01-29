// EditEscrowForm.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditEscrowForm = ({ escrow, onUpdate, onClose }) => {
  const [editedEscrow, setEditedEscrow] = useState(escrow);

  useEffect(() => {
    setEditedEscrow(escrow);
  }, [escrow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEscrow((prevEscrow) => ({ ...prevEscrow, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the escrow item using the API
    axios
      .put(`http://localhost:5000/api/emaster/${escrow.id}`, editedEscrow)
      .then((response) => {
        onUpdate(response.data);
        onClose();
      })
      .catch((error) => {
        console.error(`Error updating escrow with ID ${escrow.id}:`, error);
      });

    // For demonstration purposes, we'll simulate the API call with a timeout
    // setTimeout(() => {
    //   onUpdate(editedEscrow);
    //   console.log(editedEscrow);
    //   onClose();
    // }, 1000);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Escrow</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="itemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="item_name"
              value={editedEscrow.item_name}
              onChange={handleChange}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="escrow_type">
            <Form.Label>Escrow Type</Form.Label>
            <Form.Control
              type="text"
              name="escrow_type"
              value={editedEscrow.escrow_type}
              onChange={handleChange}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="mop">
            <Form.Label>Mode of payment</Form.Label>
            <Form.Control
              type="text"
              name="mop"
              value={editedEscrow.mop}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="beneficiary_name">
            <Form.Label>Beneficiary Name</Form.Label>
            <Form.Control
              type="text"
              name="beneficiary_name"
              value={editedEscrow.beneficiary_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="bank_name">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              name="bank_name"
              value={editedEscrow.bank_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="account_number">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="number"
              name="account_number"
              value={editedEscrow.account_number}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="route_number">
            <Form.Label>Route Number </Form.Label>
            <Form.Control
              type="number"
              name="route_number"
              value={editedEscrow.route_number}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="text-center mt-3" variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditEscrowForm;
