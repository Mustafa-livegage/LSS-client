import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import EditableTableCell from "../components/EditableTableCell";
import { formatCurrency } from "../helper/formatCurrency";

const Details = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [loan, setLoan] = useState([]);
  const [payment, setPayment] = useState([]);
  const [waterfallOptions, setWaterfallOptions] = useState([]);

  const fetchLoanAndPaymentData = async () => {
    try {
      const [loanResponse, paymentResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/loans/${id}`),
        axios.get(`http://localhost:5000/api/schedule/${id}`),
      ]);
      setLoan(loanResponse.data);
      setPayment(paymentResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWaterfallOptions = () => {
    axios
      .get("http://localhost:5000/api/waterfall/")
      .then(function (response) {
        setWaterfallOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLoanAndPaymentData();
    fetchWaterfallOptions();
  }, [id]);

  const handleSavePPR = useCallback(
    (updatePpr) => {
      console.log("updatePpr:", updatePpr);
      const updatedLoanDetails = { ...loan, waterfall_name: updatePpr };
      try {
        axios.put(`http://localhost:5000/api/loans/${id}`, updatedLoanDetails);
      } catch (error) {
        console.error(error);
      }
      setLoan(updatedLoanDetails);
    },
    [loan, id]
  );

  const formattedUPBAmount = useMemo(
    () => formatCurrency(loan.upb_amount),
    [loan.upb_amount]
  );

  const savingId = () => {
    history(`/payment-schedule-details/${loan.id}`);
  };

  return (
    <>
      <BackButton />
      <Container className="d-flex flex-column align-align-items-center justify-content-center">
        <div className="text-center  mt-5 fw-bold">
          <h2 className="fw-bold fs-1 text-decoration-underline ">
            Loan Details
          </h2>
        </div>

        <Table className=" table-striped table-responsive my-5 text-center table fs-5  my-4">
          <thead>
            <tr>
              <th>Loan Number</th>
              <th>{loan.loan_number}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Borrower Name</td>
              <td>{loan.name}</td>
            </tr>
            <tr>
              <td>Note Date</td>
              <td>{loan.note_date}</td>
            </tr>
            <tr>
              <td>Note Rate Percent</td>
              <td>{loan.note_rate} %</td>
            </tr>
            <tr>
              <td>Loan Boarding Date</td>
              <td>{loan.boarding_date}</td>
            </tr>
            <tr>
              <td>UPB Amount</td>
              <td>{`${formattedUPBAmount}`}</td>
            </tr>
            <tr>
              <td>Current Interest Rate</td>
              <td>{loan.current_rate} %</td>
            </tr>
            <tr>
              <td>Next Payment Due Date</td>
              <td>{loan.pmt_due_date}</td>
            </tr>
            {payment[0] && (
              <tr>
                <td>Monthly Payment</td>
                <td>
                  {`${formatCurrency(
                    payment[0].interest_amount +
                      payment[0].principal_amount +
                      loan.escrow_amount / 12
                  )}`}
                </td>
              </tr>
            )}
            <tr>
              <td>Tax and Insurance payment</td>
              <td>{`${formatCurrency(loan.escrow_amount / 12)}`}</td>
            </tr>

            <tr>
              <td>PPR</td>
              <td className="fw-bold d-flex flex-row align-items-center justify-content-center">
                <EditableTableCell
                  value={loan.waterfall_name}
                  onSave={handleSavePPR}
                  options={waterfallOptions.map((wf) => wf.w_name)}
                />
              </td>
            </tr>
            {loan.upb_amount != 0 && (
              <tr>
                <td>Schedules</td>
                <td>
                  <Link to={`/payment-schedule-details/${loan.id}`}>
                    <Button
                      variant="dark"
                      className="rounded"
                      onClick={savingId}
                    >
                      Show Details
                    </Button>
                  </Link>
                </td>
              </tr>
            )}
            <tr>
              <td>Payment</td>
              <td>
                <Link to={`/payment/${loan.id}`}>
                  <Button variant="dark" className="rounded" onClick={savingId}>
                    Make Payment
                  </Button>
                </Link>
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
                {loan.upb_amount == 0 ? "Loan Closed" : "Active"}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Details;
