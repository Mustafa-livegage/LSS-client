import { useEffect, useState } from "react";
import { Container, Form, InputGroup, Button, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const handleRowClick = (row) => {
  console.log("Clicked row:", row);
};

const HomePage = () => {
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/loans")
      .then(function (response) {
        setLoans(response.data);
        setFilteredLoans(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
    // const isConfirmed = window.confirm(
    //   "Are you sure you want to delete this loan?"
    // );

    // if (isConfirmed) {
    axios
      .delete(`http://localhost:5000/api/loans/${id}`)
      .then((response) => {
        // Remove the deleted loan from the state
        setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== id));
        setFilteredLoans((prevFilteredLoans) =>
          prevFilteredLoans.filter((loan) => loan.id !== id)
        );
        console.log(`Loan with ID ${id} deleted successfully`);
      })
      .catch((error) => {
        console.error(`Error deleting loan with ID ${id}:`, error);
      });
    // }
  };

  return (
    <>
      <Container className="container-fluid text-center mt-5">
        <h2 className="fw-bold fs-1">Loan Servicing System</h2>

        <div classname="w-100">
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
              <Button variant="dark" classname="rounded">
                Board
              </Button>
            </Link>
          </InputGroup>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Loan Number</th>
                <th>Borrower Name</th>
                <th>Upload Date</th>
                <th>UPB Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.id} onClick={() => handleRowClick(loan)}>
                  <td>{loan.loan_number}</td>
                  <td>{loan.name}</td>
                  <td>{loan.boarding_date}</td>
                  <td>{loan.upb_amount}</td>
                  <td>null</td>
                  <td>
                    {/* Add a delete button with onClick handler */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(loan.id)}
                    >
                      Delete
                    </Button>
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
