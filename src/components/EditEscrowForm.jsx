// EditEscrowForm.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";

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
    axios
      .put(`http://localhost:5000/api/emaster/${escrow.id}`, editedEscrow)
      .then((response) => {
        onUpdate(response.data);
        onClose();
      })
      .catch((error) => {
        console.error(`Error updating escrow with ID ${escrow.id}:`, error);
      });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Escrow</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="itemName" className="mt-3">
            <FloatingLabel label="item Name">
              <Form.Control
                type="text"
                name="item_name"
                value={editedEscrow.item_name}
                onChange={handleChange}
                disabled
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="escrow_type" className="mt-3">
            <FloatingLabel label="Escrow Type">
              <Form.Control
                type="text"
                name="escrow_type"
                value={editedEscrow.escrow_type}
                onChange={handleChange}
                disabled
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="mop" className="mt-3">
            <FloatingLabel label="Mode of payment">
              <Form.Control
                type="text"
                name="mop"
                value={editedEscrow.mop}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="beneficiary_name" className="mt-3">
            <FloatingLabel label="Beneficiary Name">
              <Form.Control
                type="text"
                name="beneficiary_name"
                value={editedEscrow.beneficiary_name}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="bank_name" className="mt-3">
            <FloatingLabel label="Bank Name">
              <Form.Control
                type="text"
                name="bank_name"
                value={editedEscrow.bank_name}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="account_number" className="mt-3">
            <FloatingLabel label="Account Number">
              <Form.Control
                type="number"
                name="account_number"
                value={editedEscrow.account_number}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="route_number" className="mt-3">
            <FloatingLabel label="Routing Number">
              <Form.Control
                type="number"
                name="route_number"
                value={editedEscrow.route_number}
                onChange={handleChange}
              />
            </FloatingLabel>
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
