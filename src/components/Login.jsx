import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './Login.css';
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
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
  
    // Create the request body
    try {
      const {data} = await axios.post(
      "http://localhost:3300/api/v1/alumni/signin",
      {
        email:email, 
        password:password,
        
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
      
    );
     console.log(data);
      localStorage.setItem('userInfo', data.data);
			navigate('/profile');
    } catch (error) {
      console.log(error);
    }
    
  }
  
  

  return (
    <div className='LoginCont'>
         <div className="loginbox">
            <h1 style={{color:'blue'}}>ALUMCONNECT</h1>
            <Container className="small-container loginsecondcont">
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
            //   disabled={!allFill()}
              style={{ width: "40%" }}
            >
              Log In
            </Button>
            </Form>
            </Container>
         </div>
    </div>
  )
}

export default Login