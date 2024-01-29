import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function BankDetailsModal({ showModal, handleClose, id }) {
  const [bankDetails, setBankDetails] = useState([]);

  useEffect(() => {
    {
      if (showModal) {
        axios
          .get(`http://localhost:5000/api/emaster/${id}`)
          .then(function (response) {
            setBankDetails(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [id]);

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <hr />
          <Modal.Title className=" fs-3 justify-content-center   text-center">
            Bank Details
          </Modal.Title>
          <hr />
        </Modal.Header>
        <Modal.Body className="text-center fw-bold fs-5">
          <ListGroup>
            <ListGroup.Item>
              Beneficiary Name: {bankDetails.beneficiary_name}
            </ListGroup.Item>
            <ListGroup.Item>Bank name : {bankDetails.bank_name}</ListGroup.Item>
            <ListGroup.Item>
              Account Number: {bankDetails.account_number}
            </ListGroup.Item>
            <ListGroup.Item>
              Route Number : {bankDetails.route_number}
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BankDetailsModal;
