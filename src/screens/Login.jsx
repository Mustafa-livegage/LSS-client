import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
// import axios from "./api/axios";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  // const { setAuth } = useAuth();
  const { fetchUserWithRoles, login } = useAuth();
  const { auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/login", {
  //       email,
  //       password: pwd,
  //     });
  //     const username = response?.data?.u_name;
  //     const roles = response?.data?.role;
  //     setAuth({ email, pwd, roles, username });
  //     setEmail("");
  //     setPwd("");
  //     navigate(from, { replace: true });
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrMsg("No Server Response");
  //     } else if (err.response?.status === 400) {
  //       setErrMsg("Missing Username or Password");
  //     } else if (err.response?.status === 401) {
  //       setErrMsg("Unauthorized");
  //     } else {
  //       setErrMsg("Login Failed");
  //     }
  //     errRef.current.focus();
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const [success, userRole] = await login(email, pwd);

    if (success) {
      setEmail("");
      setPwd("");
      console.log(userRole);
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
