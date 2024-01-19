import axios from "axios";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import BackButton from "../components/BackButton";
import { formatCurrency } from "../helper/formatCurrecny";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditableTableCell from "../components/EditableTableCell";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [loan, setLoan] = useState([]);
  const [waterfall, setWaterfall] = useState("");
  const [payment, setPayment] = useState([]);
  const [waterfallOptions, setWaterfallOptions] = useState([]);

  const fetchLoanAndPaymentData = async () => {
    try {
      const [loanResponse, paymentResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/loans/${id}`),
        axios.get(`http://localhost:5000/api/schedule/${id}`),
      ]);
      console.log(loanResponse.data.waterfallId);
      // setWfId(loanResponse.data.waterfallId);
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
              <td>{"$ " + `${formattedUPBAmount}`}</td>
            </tr>
            <tr>
              <td>Current Interest Rate</td>
              <td>{loan.current_rate}</td>
            </tr>
            <tr>
              <td>Net Payment Due Date</td>
              <td>{loan.pmt_due_date}</td>
            </tr>
            {payment[0] && (
              <tr>
                <td>Principal and Interest</td>
                <td>
                  {"$ " + `${formatCurrency(payment[0].interest_amount)}`}
                </td>
              </tr>
            )}
            <tr>
              <td>Tax and Insurance payment</td>
              <td>{"$ " + `${formatCurrency(loan.escrow_amount / 12)}`}</td>
            </tr>
            {/* <tr>
              <td>Total Payment amount</td>
              <td>{"$ " + `${formatCurrency(payment.monthly_payment)}`}</td>
            </tr> */}

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

            <tr>
              <td>Payment Schedule</td>
              <td>
                <Link
                  to={`/payment-schedule-details/${loan.id}`}
                  state={{
                    loanNumber: loan.loan_number || "",
                    userName: loan.name || "",
                    interestRate: loan.current_rate || "",
                    boardDate: loan.boarding_date || "",
                  }}
                >
                  <Button
                    variant="primary"
                    className="rounded"
                    onClick={savingId}
                  >
                    Show Details
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
                {loan.upb_amount == 0 ? "Expired" : "Active"}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Details;
