import { useEffect, useState } from "react";
import {
  Container,
  Form,
  InputGroup,
  Button,
  Table,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatCurrency } from "../helper/formatCurrecny";

const HomePage = () => {
  const history = useNavigate();
  const [escrow, setEscrow] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const id = "1d879277-b227-4b0a-8c85-9e7a89fa51f2";

  const fetchEscrow = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/escrow/`
      );
      setEscrow(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEscrow();
  }, []);
  useEffect(() => {
    
  }, [escrow])
  

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
      <Container className="mt-5 d-flex flex-column" style={{justifyContent:"center",alignItems:"center"}}>
        <h2 className="fw-bold fs-1">Escrow Details</h2>

        <div className="d-flex gap-3 flex-wrap" style={{margin:"50px"}}>
          {escrow.map((es) => (
            <Card style={{ width: "19rem", borderRadius: "10px" }} key={es.month}>
                <Card.Header className=" text-center fw-bold ">{es.month}</Card.Header>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <div className="row w-100 fw-bold ">
                  <div className="col-8">
                    <Card.Text>Monthly Payment</Card.Text>
                  </div>
                  <div className="col-4 text-end">
                    <Card.Text>{es.escrow}</Card.Text>
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-8">
                    <Card.Text>County Tax</Card.Text>
                  </div>
                  <div className="col-4 text-end">
                    <Card.Text>{es.county_tax}</Card.Text>
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-8">
                    <Card.Text>District Tax </Card.Text>
                  </div>
                  <div className="col-4 text-end">
                    <Card.Text>{es.special_district_tax}</Card.Text>
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-8">
                    <Card.Text>Mortgage Insurance</Card.Text>
                  </div>
                  <div className="col-4 text-end">
                    <Card.Text>{es.mortgage_insurance}</Card.Text>
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-8">
                    <Card.Text>Hazard Insurance</Card.Text>
                  </div>
                  <div className="col-4 text-end">
                    <Card.Text>{es.hazard_insurance}</Card.Text>
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-8">
                    <Card.Text>Flood Insurance</Card.Text>
                  </div>
                  <div className="col-4 text-end">
                    <Card.Text>{es.flood_insurance}</Card.Text>
                  </div>
                </div>
                <div className="row w-100 fw-bold">
                  <div className="col-8">
                    <Card.Text>Balance</Card.Text>
                  </div>
                  <div className="col-4 text-end">
                    <Card.Text>{es.balance}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default HomePage;
