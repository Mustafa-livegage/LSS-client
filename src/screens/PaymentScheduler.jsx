import React, { useState, useEffect } from "react";
import { Container, Table, Tab, Tabs } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../helper/formatCurrecny";
import PaymentSchedule from "../components/PaymentSchedule";

const PaymentScheduler = () => {

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center w-100">

      <Tabs defaultActiveKey="paymentSchedule" className="mb-3 w-100" fill>
        
        <Tab eventKey="paymentSchedule" title="Payment Schedule" className="w-100">
          <PaymentSchedule />
        </Tab>


        <Tab eventKey="Escrow Details" title="Escrow Details">
          <Container>
            <div className="text-center mt-5">
              <h2 className="fw-bold fs-1 text-decoration-underline">
                Escrow Details
              </h2>
              <p>Card Components will be shown here.</p>
            </div>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default PaymentScheduler;
