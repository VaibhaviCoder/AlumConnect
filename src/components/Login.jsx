import React, { useState } from "react";
import axios from "axios";

import "./Login.css";
import { Button, Col, Container, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;

  function onclickhandler(e){
    navigate('/register')
 }
  const validateEmail = (e) => {
    if (e.target.value) {
      const email = e.target.value;
      const atPos = email.indexOf("@");
      const domain = email.split("@")[1];
      const validDomain = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "live.com",
        "outlook.com",
        "mail.com",
      ];
      if (atPos > 1 && validDomain.includes(domain)) {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        document.getElementById("regSubmit").disabled = false;
        setEmail(e.target.value);
      } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        document.getElementById("regSubmit").disabled = true;
      }
    }
  };

  async function submithandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const { data } = await axios.post(
        `${SERVER_CONFIG}/api/v1/alumni/signin`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("userInfo", data.data);
      navigate("/profile");
    } catch (error) {
      // console.log(error.response.data.error.explanation);
      setError(
        `${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`
      );
    }
  }

  return (
    <>
    <div className='header_box'> </div>
    <div className="LoginCont">
      {/* <FaHome onClick={icononclickhandler} size={30} style={{ color: "black", marginRight: "2rem", position:"absolute", top:"20px", left:"40px",cursor:"pointer" }} /> */}
      <div className="loginbox">
        <h1 style={{ color: "blue" }}>ALUMCONNECT</h1>
        
        <Container className="small-container loginsecondcont">
          {error && <Alert variant="danger">{error}</Alert>}
  
          <Form encType="multipart/form-data" onSubmit={submithandler}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label></Form.Label>
              <Form.Control
                className="email"
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => validateEmail(e)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
            className="my-5"
            variant="primary"
            type="submit"
            id="regSubmit"
            // disabled={!allFill()}
            style={{  marginRight:"1rem" }}
          >
            LOG IN
          </Button>
          <Button
            className="my-5"
            variant="outline-secondary"
            onClick={onclickhandler}
            // style={{ width: "40%" }}
          >
            SIGN UP
          </Button>
          </Form>
          
        </Container>
      </div>
    </div>
    </>
  );
};

export default Login;
