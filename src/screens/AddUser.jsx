import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Alert, Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { FaCheck, FaInfoCircle, FaTimes } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const AddUser = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, email);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    axios
      .post("http://localhost:5000/api/adduser", {
        u_name: user,
        email,
        role: "servicer",
      })
      .then((response) => {
        console.log(response?.data);
        setSuccess(true);
        setUser("");
        setEmail("");
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 500) {
          setErrMsg("Email Taken");
        } else {
          setErrMsg("Registration Failed");
        }
        setSuccess(false);
        errRef.current.focus();
      });
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center p-3 bg-white w-25 mt-5 rounded-5 ">
        {success && (
          <Container>
            <Alert
              variant={"success"}
              onClose={() => {
                setSuccess(false);
              }}
              dismissible
            >
              User Registered
            </Alert>
          </Container>
        )}
        {errMsg.length > 2 && (
          <Alert
            variant={"danger"}
            onClose={() => {
              setErrMsg("");
            }}
            dismissible
          >
            {errMsg}
          </Alert>
        )}

        <h1 className="text-center">Add User</h1>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column justify-content-evenly flex-grow-1  pb-3"
        >
          <div className="d-flex flex-row justify-content-center align-items-center w-100">
            <FloatingLabel
              className="my-4 w-75"
              controlId="username"
              label="Username:"
            >
              <Form.Control
                type="text"
                name="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder="Bucky Barnes"
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </FloatingLabel>
            <div>
              <FaCheck
                size={20}
                className={validName ? "text-success ms-2" : "d-none"}
              />
              <FaTimes
                size={20}
                className={validName || !user ? "d-none" : "text-danger ms-2"}
              />
            </div>
          </div>

          <p
            className={
              userFocus && user && !validName
                ? "text-sm rounded-2 text-light bg-dark p-2 w-75 align-self-center"
                : "d-none"
            }
          >
            <FaInfoCircle className="mx-2" />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <div className="d-flex flex-row justify-content-center align-items-center w-100">
            <FloatingLabel
              className="my-4 w-75"
              controlId="email"
              label="Email:"
            >
              <Form.Control
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
                required
                placeholder="Test@internet.com"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </FloatingLabel>
            <div>
              <FaCheck
                size={20}
                className={validEmail ? "text-success ms-2" : "d-none"}
              />
              <FaTimes
                size={20}
                className={validEmail || !email ? "d-none" : "text-danger ms-2"}
              />
            </div>
          </div>
          <p
            className={
              emailFocus && !validEmail
                ? "text-sm text-light rounded bg-dark p-2 align-self-center"
                : "d-none"
            }
          >
            <FaInfoCircle className="mx-2" />
            Should be a valid Email.
          </p>

          <Button
            className="align-self-center fs-4 w-50 p-2 rounded-1 mt-3"
            type="submit"
            disabled={!validName || !validEmail ? true : false}
          >
            Add User
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddUser;
