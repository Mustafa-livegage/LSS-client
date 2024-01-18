import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../helper/formatCurrecny";

const PaymentScheduler = () => {
  const location = useLocation();
  const { loanNumber, userName, interestRate,boardDate } = location.state;
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState([]);

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return day + "-" + month + "-" + year;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/schedule/${id}`)
      .then((response) => {
        setScheduleData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment schedule data:", error);
      });
  }, [id]);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mt-5">
        <h2 className="fw-bold fs-1 text-decoration-underline">
          Payment Schedule
        </h2>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center w-100 mt-5">
        <div>
          <h3 >Loan Number : <strong>{loanNumber}</strong></h3>
          <h3 >Borrower Name : <strong>{userName}</strong></h3>
        </div>
        <div>
          <h3>Interest Rate : <strong>{interestRate} {' %'}</strong></h3>
          <h3>Boarding Data : <strong>{parseDate(boardDate)}</strong></h3>
        </div>
      </div>

      <Table className="table-striped table-responsive mt-3 text-center table fs-5 my-4">
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Payment</th>
            <th>Principal Amount</th>
            <th>Interest Amount</th>
            <th>Escrow Amount</th>
            <th>UPB Amount</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((data, index) => (
            <tr key={index}>
              <td>
                <strong>{data.month}</strong>
              </td>
              <td>{"$ " + `${formatCurrency(data.monthly_payment)}`}</td>
              <td>{"$ " + `${formatCurrency(data.principal_amount)}`}</td>
              <td>{"$ " + `${formatCurrency(data.interest_amount)}`}</td>
              {data.escrow != 0 && (
                <td>{"$ " + `${formatCurrency(data.escrow)}`}</td>
              )}

              <td>{"$ " + `${formatCurrency(data.upb_amount)}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentScheduler;
