import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import BackButton from "../components/BackButton";
import { formatCurrency } from "../helper/formatCurrecny";

const EditableTableCell = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(editValue);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  return isEditing ? (
    <input
      type="text"
      value={editValue}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <div onDoubleClick={handleDoubleClick}>{value}</div>
  );
};

const Details = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState([]);

  const handleSavePPR = async (newPPR) => {
    const updatedLoanDetails = { ...loan, ppr: newPPR };

    try {
      await axios.put(`http://localhost:5000/api/loans/${id}`, newPPR)
      


      // Assuming your API supports updating the PPR field using a PUT request
    } catch (error) {
      console.error(error);
    }
    setLoan(updatedLoanDetails);

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/loans/${id}`);
        setLoan(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function
  }, [id]);

  return (
    <>
      <BackButton />
      <Container className="d-flex flex-column align-align-items-center justify-content-center">
        <div className="text-center  mt-5 fw-bold">
          <h2 className="fw-bold fs-1 text-decoration-underline ">
            Loan Details
          </h2>
        </div>

        <table className=" table-striped table-responsive my-5 text-center table fs-5  my-4">
          <thead>
            <tr>
              <th>Loan Number</th>
              <th>{loan.loan_number}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Borrowers Name</td>
              <td>{loan.name}</td>
            </tr>
            <tr>
              <td>Note Date</td>
              <td>{loan.note_date}</td>
            </tr>
            <tr>
              <td>Note Rate Percent</td>
              <td>{loan.note_rate}</td>
            </tr>
            <tr>
              <td>Loan Boarding Date</td>
              <td>{loan.boarding_date}</td>
            </tr>
            <tr>
              <td>UPB Amount</td>
              <td>{"$ " + `${formatCurrency(loan.upb_amount)}`}</td>
            </tr>
            <tr>
              <td>Current Interest Rate</td>
              <td>{loan.current_rate}</td>
            </tr>
            <tr>
              <td>Net Payment Due Date</td>
              <td>{loan.pmt_due_date}</td>
            </tr>
            <tr>
              <td>Principal and Interest</td>
              <td>{"$ " + `${formatCurrency(loan.principal_intrest)}`}</td>
            </tr>
            <tr>
              <td>Tax and Insurance payment</td>
              <td>{"$ " + `${formatCurrency(loan.tax_insurance)}`}</td>
            </tr>
            <tr>
              <td>Total Payment amount</td>
              <td>{"$ " + `${formatCurrency(loan.pmt_amount)}`}</td>
            </tr>

            <tr>
              <td>PPR</td>
              <td className="fw-bold">
                <EditableTableCell value={loan.ppr} onSave={handleSavePPR} />
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                className="text-white fw-bold"
                style={
                  loan.upb_amount == 0
                    ? { backgroundColor: "grey" }
                    : { backgroundColor: "green" }
                }
              >
                {loan.upb_amount == 0 ? "Expired" : "Active"}
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default Details;
