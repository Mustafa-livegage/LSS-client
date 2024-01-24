import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
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
      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{bankDetails.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        {/* <Modal.Footer>
            
          </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default BankDetailsModal;
