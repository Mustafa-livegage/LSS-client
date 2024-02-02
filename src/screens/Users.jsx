import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { GoPasskeyFill, GoPerson } from "react-icons/go";

const Users = () => {
  const [user, setUsers] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(function (response) {
        setUsers(response.data.reverse());
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = () => {
    setFilteredUsers(
      user.filter((u) =>
        u.user_name.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this loan?"
    );

    if (isConfirmed) {
      axios
        .delete(`http://localhost:5000/api/deleteUser/${id}`)
        .then((response) => {
          // Remove the deleted loan from the state
          setUsers((prevUser) => prevUser.filter((u) => u.Id !== id));
          setFilteredUsers((prevFilteredUsers) =>
            prevFilteredUsers.filter((u) => u.Id !== id)
          );
        })
        .catch((error) => {
          console.error(`Error deleting loan with ID ${id}:`, error);
        });
    }
  };

  return (
    <>
      <Container className="text-center mt-5">
        <h2 className="fw-bold fs-1">Users</h2>
        <div className="w-100">
          <InputGroup className="my-5">
            <Form.Control
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter user name to search"
            />

            <Button
              onClick={handleSearch}
              className="mx-3 rounded"
              variant="dark"
            >
              Search
            </Button>
          </InputGroup>
        </div>
        <div>
          <Table responsive striped bordered hover>
            <thead>
              <tr className="table-dark">
                <th>User Name</th>
                <th>Email Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="fs-4">
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    {u.user_name}
                    {u.role === "admin" ? (
                      <GoPasskeyFill size={20} className="ms-2" />
                    ) : (
                      <GoPerson size={20} className="ms-2" />
                    )}
                  </td>
                  <td>{u.email}</td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ zIndex: 2 }}
                      onClick={() => handleDelete(u.id)}
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

export default Users;
