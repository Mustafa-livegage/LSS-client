import { useEffect, useState } from "react";
import { Container, Form, InputGroup, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../helper/formatCurrency";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const history = useNavigate();
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/loans")
      .then(function (response) {
        setLoans(response.data.reverse());
        setFilteredLoans(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return year + "-" + month + "-" + day;
  };

  const handleSearch = () => {
    setFilteredLoans(
      loans.filter(
        (loan) =>
          loan.loan_number.toString().includes(searchTerm) ||
          loan.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this loan?"
    );

    if (isConfirmed) {
      axios
        .delete(`http://localhost:5000/api/loans/${id}`)
        .then((response) => {
          // Remove the deleted loan from the state
          setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== id));
          setFilteredLoans((prevFilteredLoans) =>
            prevFilteredLoans.filter((loan) => loan.id !== id)
          );
        })
        .catch((error) => {
          console.error(`Error deleting loan with ID ${id}:`, error);
        });
    }
  };

  const handleRowClick = (loan) => {
    history(`/loan-details/${loan.id}`);
  };

  const savingId = () => {
    history(`/payment-schedule-details/${loan.id}`);
  };
  return (
    <>
      <Container className="container-fluid text-center mt-5">
        <h2 className="fw-bold fs-1">
          Loan Servicing System for{" "}
          <span className="text-decoration-underline ">{auth.user_name}</span>
        </h2>

        <div className="w-100">
          <InputGroup className="my-5">
            <Form.Control
              placeholder="Enter loan number or borrower name"
              aria-label=""
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button
              className="mx-3 rounded"
              variant="dark"
              onClick={handleSearch}
            >
              Search
            </Button>
          </InputGroup>
        </div>
        <div>
          {loans.length > 0 && (
            <Table striped responsive bordered hover>
              <thead>
                <tr className="table-dark">
                  <th>Loan Number</th>
                  <th>Borrower Name</th>
                  <th>Boarding Date</th>
                  <th>UPB Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td
                      onClick={() => handleRowClick(loan)}
                      style={{ cursor: "pointer" }}
                    >
                      {loan.loan_number}
                    </td>
                    <td>{loan.name}</td>
                    <td>{parseDate(loan.boarding_date)}</td>
                    <td>{`${formatCurrency(loan.upb_amount)}`}</td>

                    <td className=" fw-bold">
                      {loan.upb_amount == 0 ? "Loan Closed" : "Active"}
                    </td>

                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ zIndex: 2 }}
                        onClick={() => handleDelete(loan.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
    </>
  );
};

export default HomePage;
