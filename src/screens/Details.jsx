import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";

const Details = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState([]);
  useEffect(() => {
    // Fetch data based on route parameters
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/loans/${id}`
        );
        setLoan(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function
  }, [id]); // Add dependencies as needed
  return (
    <>
      <Container className="d-flex flex-column align-align-items-center justify-content-center">
        <div className="text-center  mt-5 fw-bold">
          <h2 className="fw-bold fs-1 ">Loan Details</h2>
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
              <td>{loan.upb_amount}</td>
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
              <td>{loan.principal_intrest}</td>
            </tr>
            <tr>
              <td>Tax and Insurance payment</td>
              <td>{loan.tax_insurance}</td>
            </tr>
            <tr>
              <td>Total Payment amount</td>
              <td>{loan.pmt_amount}</td>
            </tr>
            <tr>
              <td>Borrowers Name</td>
              <td>{loan.name}</td>
            </tr>
            <tr>
              <td>PPR</td>
              <td className="fw-bold ">{loan.ppr}</td>
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
