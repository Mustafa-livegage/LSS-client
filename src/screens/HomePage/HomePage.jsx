import { useEffect, useState } from "react";
import { Container, Form, InputGroup, Button, Table } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
// import Details from "../ShowDetails/Details";

const handleRowClick = (row) => {
  console.log("Clicked row:", row);
};

const HomePage = () => {
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);

  const [selectedLoan, setSelectedLoan] = useState(null);

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

  const showDetails = (loan) => {
    setSelectedLoan(loan);
  };



    const handleRowClick = (loan) => {
      console.log('Clicked row:', loan);
      window.location.href = `/loan-details/${loan.id}`;
      // axios
      // .get(`http://localhost:5000/api/loans/${loan.id}`)
      // .then()
      
  };

  return (
    <>
      <Container className="container-fluid text-center mt-5">
        <h2 className="fw-bold fs-1">Loan Servicing System</h2>

        <div className="w-100">
          <InputGroup className="my-5">
            <Form.Control
              placeholder="Loan number"
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
      {/* temp  */}

      {/* {selectedLoan && <Details loan={selectedLoan} />} */}
    </>
  );
};

export default HomePage;
