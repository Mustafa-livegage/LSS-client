import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { formatCurrency } from "../helper/formatCurrency";

const PaymentSchedule = ({ data }) => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center w-100 mt-5">
      <Table className="table-striped table-responsive w-100 text-center table fs-5">
        <thead>
          <tr className=" table-dark ">
            <th>Month</th>
            <th>Total Payment</th>
            <th>Principal Amount</th>
            <th>Interest Amount</th>
            <th>Escrow Amount</th>
            <th>UPB Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td className="px-3 text-start">
                <strong>{data.month}</strong>
              </td>
              <td>{`${formatCurrency(data.monthly_payment)}`}</td>
              <td>{`${formatCurrency(data.principal_amount)}`}</td>
              <td>{`${formatCurrency(data.interest_amount)}`}</td>
              <td>{`${formatCurrency(data.escrow)}`}</td>
              <td>{`${formatCurrency(data.upb_amount)}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentSchedule;
