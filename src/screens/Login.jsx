import { useEffect, useRef, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { fetchUserWithRoles, login } = useAuth();
  const { auth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [success, userRole] = await login(email, pwd);

    if (success) {
      setEmail("");
      setPwd("");
      navigate(userRole == "admin" ? "/users" : "/", { replace: true });
    } else {
      // Handle login failure
      setErrMsg("Login failed. Please check your credentials.");
      errRef.current.focus();
    }
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center p-3 bg-white w-25 mt-5 rounded-5 ">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <h1 className="text-center">Sign In</h1>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column justify-content-evenly flex-grow-1 pb-3"
        >
          <div className="d-flex flex-row justify-content-center align-items-center w-100">
            <FloatingLabel
              className="my-4 w-75"
              controlId="email"
              label="Email: "
            >
              <Form.Control
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={userRef}
                autoComplete="off"
                required
                placeholder="Test@internet.com"
              />
            </FloatingLabel>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center w-100">
            <FloatingLabel
              className="my-4 w-75"
              controlId="password"
              label="Password: "
            >
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="Test@internet.com"
              />
            </FloatingLabel>
          </div>

          <Button
            className="align-self-center fs-4 w-50 p-2 rounded-1 mt-3"
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
