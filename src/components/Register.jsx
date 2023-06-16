import React, { useState } from 'react'
import './Register.css'
import { Button, Col, Container, Form, InputGroup, Row,Alert } from "react-bootstrap";
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
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState();
  const navigate=useNavigate();
  // Generate batch options dynamically
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  function onclickhandler(e){
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

  async function submithandler(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3300/api/v1/alumni/signup",
        {
          email: email,
          password: password,
          phoneNumber: phone,
          name: name,
          gender: gender,
          branch: branch,
          rollNo: rollNo,
          graduationYear: batch,
          degreeCertificate: 'geresfs',

        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }

      );
      setSuccess(true);
    } catch (error) {
      setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
    }
  }


  return (
    
    <div className='rc1'>
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
                <option>Leather Technology</option>
                <option>Pharma</option>
                <option>Biomedical & Robotics Engineering</option>
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
              <Form.Label>Batch*</Form.Label>
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
                name='receipt'
                required
              // onChange={(e) => validateFile(e)}
              />
            </Form.Group>
          </Row>
          
          <Button
            className="my-5"
            variant="primary"
            type="submit"
            id="regSubmit"
            // disabled={!allFill()}
            style={{ width: "40%", marginRight:"1rem" }}
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

  )
}

export default Register