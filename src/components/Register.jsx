import React, { useState } from 'react'

import './Register.css'
import { Button, Col, Container, Form, InputGroup, Row, Alert } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Register() {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [branch, setBranch] = useState();
  const [rollNo, setRollNo] = useState();
  const [batch, setBatch] = useState();
  const [doc, setDoc] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();

  const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;

  const navigate = useNavigate();
  // Generate batch options dynamically
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  function onclickhandler(e) {
    navigate('/profile')
  }
  

  const generateBatchOptions = () => {
    const currentYear = getCurrentYear();
    const options = [];
    for (let year = currentYear; year >= 1950; year--) {
      options.push(<option key={year}>{year}</option>);
    }
    return options;
  };
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
  const validateMobile = (e) => {
    if (e.target.value) {
      const pattern = /^[6-9]\d{9}$/;
      if (pattern.test(e.target.value)) {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        document.getElementById("regSubmit").disabled = false;
        setPhone(e.target.value);
      } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");

        document.getElementById("regSubmit").disabled = true;
      }
    }
  };
  const validatePassword = (e) => {
    if (e.target.value) {
      if (password === e.target.value) {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        setConfirmPass(e.target.value)
      } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
      }
    }
  }
  const validateFile = (e) => {
    var file = e.target.files[0];
    if (file && (file.size / 1024 / 1024) < 5) {
      setDoc(file);
    } else {
      window.alert('file size should be less than 5 mb');
      e.target.value = '';

    }
  }

  async function submithandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phoneNumber', phone);
      formData.append('name', name);
      formData.append('gender', gender);
      formData.append('branch', branch);
      formData.append('rollNo', rollNo);
      formData.append('graduationYear', batch);
      formData.append('degreeCertificate', doc);
      
      await axios.post(`${SERVER_CONFIG}/api/v1/alumni/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      );
      setSuccess(true);
    } catch (error) {
      setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
    }
  }


  return (
    <>
    <div className='header_box'> </div>
    <div className='rc1'>
      
      {/* <FaHome onClick={icononclickhandler} size={30} style={{ color: "black", marginRight: "2rem", position:"absolute", top:"20px", left:"40px",cursor:"pointer" }} /> */}
      <div className="signupfirstcont">
        ALUMCONNECT
      </div>
      {success ? (
        <Alert variant="success">
          Congratulations! Your application has been successfully processed. Once your account is verified by MIT, Muzaffarpur Administration using the provided credentials, you will be able to log in and access your account.
        </Alert>
      ) : (
        <Container className="small-container signupsecondcont">
          {error && <Alert variant="danger">{error}</Alert>}
          {/* <h1 style={{ textAlign: 'center', paddingBottom: '2rem', color: 'blue' }}>SIGN UP</h1> */}
          <Form encType="multipart/form-data" onSubmit={submithandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  className="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={(e) => validateEmail(e)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Mobile No.*</Form.Label>
                <InputGroup>
                  <InputGroup.Text>+91</InputGroup.Text>
                  <Form.Control
                    className="phone"
                    type="number"
                    placeholder="Mobile No."
                    required
                    onChange={(e) => validateMobile(e)}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridConfirmPass">
                <Form.Label>Confirm Password*</Form.Label>
                <Form.Control
                  className="pass"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => validatePassword(e)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Full Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>Gender*</Form.Label>
                <div key="inline-radio" className="mt-2">
                  <Form.Check
                    inline
                    label="Male"
                    name="gender"
                    value="male"
                    type="radio"
                    id="inline-radio-1"
                    required
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="gender"
                    value="female"
                    type="radio"
                    id="inline-radio-2"
                    required
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBranch">
                <Form.Label>Branch*</Form.Label>
                <Form.Select required onChange={(e) => setBranch(e.target.value)}>
                  <option>Select One</option>
                  <option>Information Technology</option>
                  <option>Mechenical Engineering</option>
                  <option>Electrical Engineering</option>
                  <option>Civil Engineering</option>
                  <option>Electronics and Communication Engineering</option>
                  <option>Leather Technology</option>
                  <option>B. Pharmacy</option>
                  <option>Biomedical and Robotics Engineering</option>
                  {/* {branchName.sort((a, b) => a.branch.localeCompare(b.branch)).map((item) => (
              <option value={`${item.value}`}>{item.branch}</option>
            ))} */}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridRoll">
                <Form.Label>College Roll No.*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Roll Number"
                  required
                  onChange={(e) => setRollNo(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBatch">
                <Form.Label>Graduation Year*</Form.Label>
                <Form.Select required onChange={(e) => setBatch(e.target.value)}>
                  <option>Select One</option>
                  {generateBatchOptions()}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Marksheet Document (less than 5 mb)*</Form.Label>
                <Form.Control
                  type="file"
                  name='degreecertificate'
                  required
                  onChange={(e) => validateFile(e)}
                />
              </Form.Group>
            </Row>

            <Button
              className="my-5"
              variant="primary"
              type="submit"
              id="regSubmit"
              // disabled={!allFill()}
              style={{ marginRight: "1rem" }}
            >
              Apply
            </Button>
            <Button
              className="my-5"
              variant="outline-secondary"
              onClick={onclickhandler}
            // style={{ width: "40%" }}
            >
              SIGN IN
            </Button>

          </Form>
        </Container>
      )}
    </div>
    </>
  )
}

export default Register