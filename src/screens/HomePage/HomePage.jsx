import "./HomePage.css";
import { Container, Form, InputGroup, Button,Table } from "react-bootstrap";
// import Table from "../../components/Navbar/Table";


// const tableData = [
//   { id: 1, column1: "Data 1-1", column2: "Data 1-2", /* ...other columns */ },
//   { id: 2, column1: "Data 2-1", column2: "Data 2-2", /* ...other columns */ },
//   // ... more rows
// ];

const tableData = [
  { id: 1, LoanNumber: "Temp", UploadDate: "Temp", UPBAmount: "Temp", BorrowerName: "Temp", Status: "Temp"},
  { id: 2, LoanNumber: "Temp", UploadDate: "Temp", UPBAmount: "Temp", BorrowerName: "Temp", Status: "Temp"}
];

const handleRowClick = (row) => {
  // Do something with the clicked row data,
  // e.g., navigate to a detail page or display a modal
  console.log("Clicked row:", row);
};
const HomePage = () => {
  return (
    <>
      <Container className="container-fluid text-center mt-5">
        {/* <InputGroup className="mb-3">
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup> */}
        <h2 className="fw-bold fs-1">Loan Servicing System</h2>

        <div classname="w-100">

          <InputGroup className="my-5">

            <Form.Control
              placeholder="Loan number"
              aria-label=""
              aria-describedby="basic-addon2"
            />
           
          <Button className="mx-3 rounded" variant="dark">Search</Button>
          
          <Button variant="dark" classname="rounded">Board</Button>
            
           
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
              {/* ...other column headers */}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} onClick={() => handleRowClick(row)}>
                <td>{row.LoanNumber}</td>
                <td>{row.UploadDate}</td>
                <td>{row.UPBAmount}</td>
                <td>{row.BorrowerName}</td>
                <td>{row.Status}</td>
                {/* ...other column data */}
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </Container>
      {/* table here */}
      
    </>
  );
};

export default HomePage;
