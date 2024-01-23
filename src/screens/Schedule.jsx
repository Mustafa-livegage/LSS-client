import React, { useState, useEffect } from "react";
import { Container, Table, Tab, Tabs } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import PaymentSchedule from "../components/PaymentSchedule";
import EscrowSchedule from "../components/EscrowSchedule";
import BackButton from "../components/BackButton";
import { formatCurrency } from "../helper/formatCurrency";

const Schedule = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [escrow, setEscrow] = useState([]);

  const fetchLoanAndPaymentData = async () => {
    try {
      const [loanResponse, scheduleResponse, escrowResponse] =
        await Promise.all([
          axios.get(`http://localhost:5000/api/loans/${id}`),
          axios.get(`http://localhost:5000/api/schedule/${id}`),
          axios.get(`http://localhost:5000/api/escrow/`),
        ]);

      setLoan(loanResponse.data);
      setSchedule(scheduleResponse.data);
      setEscrow(escrowResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLoanAndPaymentData();
  }, [id]);

  return (
    <>
      <BackButton />
      <Container className="mt-5">
        <div className="d-flex flex-row justify-content-between align-items-center w-100 mb-5">
          <div>
            <h4>
              Loan Number : <strong>{loan.loan_number}</strong>
            </h4>

            <h4>
              Interest Rate :{" "}
              <strong>
                {loan.current_rate} {" %"}
              </strong>
            </h4>
          </div>
          <div>
            <h4>
              Borrower Name : <strong>{loan.name}</strong>
            </h4>
            <h4>
              Loan Amount : <strong>{formatCurrency(loan.loan_amount)}</strong>
            </h4>
          </div>
        </div>
        <Tabs
          defaultActiveKey="paymentSchedule"
          className="fs-5 w-100 fw-bold"
          fill
        >
          <Tab eventKey="paymentSchedule" title="Payment Schedule">
            <PaymentSchedule data={schedule} />
          </Tab>

          <Tab eventKey="EscrowDetails" title="Escrow Details">
            <Container>
              <EscrowSchedule data={escrow} escrowAmt={loan.escrow_amount} />
            </Container>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Schedule;
