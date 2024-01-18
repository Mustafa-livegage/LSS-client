
import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '../helper/formatCurrecny';

const temporaryArray = new Array(20).fill();

const PaymentScheduler = () => {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/schedule/${id}`)
      .then((response) => {
        // const formattedData = response.data.map(item => ({
        //   monthly_payment: formatCurrency(item.monthly_payment),
        //   principal_amount: formatCurrency(item.principal_amount),
        //   interest_amount: formatCurrency(item.interest_amount),
        //   escrow: formatCurrency(item.escrow),
        //   upb_amount: formatCurrency(item.upb_amount),
        // }));
  
        // setScheduleData(formattedData);
        setScheduleData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching payment schedule data:', error);
        // Handle error as needed
      });
  }, [id]);
  
  

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <div className="text-center  mt-5 fw-bold">
          <h2 className="fw-bold fs-1 text-decoration-underline ">  Payment Schedule </h2>
      </div>
      <Table className="table-striped table-responsive my-5 text-center table fs-5 my-4">

        <thead>
          <tr>
            <th>Month</th>
            <th>Interest Rate</th>
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
              <td>{data.month}</td>
              <td>{data.annual_interest_rate}</td>
              <td>{"$ " + `${formatCurrency(data.monthly_payment)}`}</td>
              <td>{"$ " + `${formatCurrency(data.principal_amount)}`}</td>
              <td>{"$ " + `${formatCurrency(data.interest_amount)}`}</td>
              <td>{"$ " + `${formatCurrency(data.upb_amount)}`}</td>
              <td>{"$ " + `${formatCurrency(data.monthly_payment)}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentScheduler;

// {"$ " + `${formatCurrency(data.monthly_payment)}`}
{/* <td>{data.principal_amount}</td>
              <td>{data.interest_amount}</td>
              <td>{data.escrow}</td>
              <td>{data.upb_amount}</td> */}