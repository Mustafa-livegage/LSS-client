import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import NavBar from "../../components/Navbar/Navbar";

const Details = () => {
    const { id } = useParams();
    const [loan, setLoan] = useState([]);
    useEffect(() => {
        // Fetch data based on route parameters
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/loans/${id}`);
            setLoan(response.data);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData(); // Call the function
      }, [id]); // Add dependencies as needed
    return (
    <>
      <Container>
        <div className="text-center  my-3 fw-bold">
          <h2>Loan Details</h2>
        </div>

{/* <div className="row">
    <div className="col-8 offset-2 "> */}

        <table className=" table-striped     text-center table    my-4">
          <thead>
            <tr>
              <th >Loan Number</th>
              <th >{loan.loan_number}</th>
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
                <td>{loan.ppr}</td>
            </tr>
          </tbody>
        </table>
    {/* </div>
</div> */}
      </Container>
    </>
  );
};

export default Details;