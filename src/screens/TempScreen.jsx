import { useEffect, useState } from "react";
import { Container, Form, InputGroup, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatCurrency } from "../helper/formatCurrecny";

const HomePage = () => {
  const history = useNavigate();
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);
  const tempArray = new Array(20).fill();


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
    return day + "-" + month + "-" + year;
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

  return (
    <>
      <Container className="container-fluid text-center mt-5">
        <h2 className="fw-bold fs-1 m-5">Escrow Details</h2>

        {/* <div className="w-100">
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
            <Link to={"/addloans"}>
              <Button variant="dark" className="rounded">
                Board
              </Button>
            </Link>
          </InputGroup>
        </div> */}
        <div>
            <Table striped responsive bordered hover>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Momthly Escrow Payment</th>
                  <th>Escrow Items</th>
                  <th>Disbursement Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {tempArray.map((_,index) => (
                  <tr key={index}>
                    <td
                      style={{ cursor: "pointer" }}
                    >
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>

                    

                    <td>
                      {/* Add a delete button with onClick handler */}
                      {/* <Button
                        variant="danger"
                        size="sm"
                        style={{ zIndex: 2 }}
                        onClick={() => handleDelete(loan.id)}
                      >
                        Delete
                      </Button> */}
                    </td>
                    <td style={{ display: "none" }}>
                      {/* <button
                      className="btn btn-primary"
                      onClick={(e) => showDetails(loan)}
                    >
                      Show All
                    </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
