import React from 'react'
import './ProfileEdit.css'
import { Button, Col, Container, Form, InputGroup, Row, Alert } from "react-bootstrap";

const ProfileEdit = () => {
    return (
        <div className='pec1'>
            <Container className="small-container signupsecondcont">
                {/* {error && <Alert variant="danger">{error}</Alert>}   */}
                <Form encType="multipart/form-data" >
                    <Row className="mb-3">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Image Upload in png,jpg formate</Form.Label>
                            <Form.Control
                                type="file"
                                name='receipt'
                                required
                            //   onChange={(e) => validateFile(e)}
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridCurrentDesignation">
                        <Form.Label>Current Designation</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridLinkdin">
                        <Form.Label>LinkedIn Profile</Form.Label>
                        <Form.Control placeholder="https://www.linkedin.com/in/utkarshkr09/" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridGitHub">
                        <Form.Label>GitHub Profile</Form.Label>
                        <Form.Control placeholder="https://github.com/utkarshkr-creator" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridTwitter">
                        <Form.Label>Twitter Profile</Form.Label>
                        <Form.Control placeholder="https://twitter.com/utkarsh47277019" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridFacebook">
                        <Form.Label>Facebook Profile</Form.Label>
                        <Form.Control placeholder="https://www.facebook.com/chrishemsworth/" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridLinkdin">
                        <Form.Label>Instagram Profile</Form.Label>
                        <Form.Control placeholder="https://www.instagram.com/chrishemsworth/" />
                    </Form.Group>



                </Form>
            </Container>
        </div>
    )
}

export default ProfileEdit