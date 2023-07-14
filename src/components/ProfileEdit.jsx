import React, { useState } from 'react'
import './ProfileEdit.css';
import axios from 'axios';
import { Alert, Button, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ProfileEdit = () => {
    const location = useLocation();
    const query = location.state;
    const {id}=useParams();
    const [adr, setAddress] = useState(query.addres);
    const [des, setDesign] = useState(query.design);
    const [lp, setLinkdinProfile] = useState(query.linkdinProfile);
    const [tp, setTwiterProfile] = useState(query.twitterProfile);
    const [ip, setInstraProfile] = useState(query.instraProfile);
    const [gp, setGitProfile] = useState(query.gitProfile);
    const [fb, setFbProfile] = useState(query.fbProfile);
    const [pimg, setpimg] = useState();
    const [error, setError] = useState(false);
    // console.log(query);
    const navigate = useNavigate();
    async function submithandler(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (pimg) {
                formData.append('picture',pimg)
            }
            formData.append('id', query.id);
            formData.append('designation', des);
            formData.append('location', adr);
            formData.append('linkdin_id', lp);
            formData.append('twitter_id', tp);
            formData.append('instragram_id', ip);
            formData.append('facebook_id', fb);
            formData.append('github_id', gp);
            await axios.post(`http://localhost:3300/api/v1/profile/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            );
            navigate('/profile');

        } catch (error) {
            setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
        }
    }
    return (
        <div className='pec1'>
            <Container className="small-container signupsecondcont">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form encType="multipart/form-data" onSubmit={submithandler}>
                    <Row className="mb-3">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Image Upload in png,jpg formate</Form.Label>
                            <Form.Control
                                type="file"
                                name='picture'
                                onChange={(e) => (setpimg(e.target.files[0]))}
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridCurrentDesignation">
                        <Form.Label>Current Designation</Form.Label>
                        <Form.Control
                            placeholder= "CEO"
                            value={des==='null'?"":des}
                            
                            onChange={(e) => (setDesign(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            placeholder="1234 Main St"
                            value={adr==='null'?"":adr}
                            onChange={(e) => (setAddress(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridLinkdin">
                        <Form.Label>LinkedIn Profile</Form.Label>
                        <Form.Control
                            placeholder="https://www.linkedin.com/in/utkarshkr09/"
                            value={lp==='null'?"":lp}
                            onChange={(e) => (setLinkdinProfile(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridGitHub">
                        <Form.Label>GitHub Profile</Form.Label>
                        <Form.Control
                            placeholder="https://github.com/utkarshkr-creator"
                            value={gp==='null'?"":gp}
                            onChange={(e) => (setGitProfile(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridTwitter">
                        <Form.Label>Twitter Profile</Form.Label>
                        <Form.Control
                            placeholder="https://twitter.com/utkarsh47277019"
                            value={tp==='null'?"":tp}
                            onChange={(e) => (setTwiterProfile(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridFacebook">
                        <Form.Label>Facebook Profile</Form.Label>
                        <Form.Control
                            placeholder= "https://www.facebook.com/chrishemsworth/"
                            value={fb==='null'?"":fb}
                            onChange={(e) => (setFbProfile(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridLinkdin">
                        <Form.Label>Instagram Profile</Form.Label>
                        <Form.Control
                            placeholder= "https://www.instagram.com/chrishemsworth/"
                            value={ip==='null'?"":ip}
                            onChange={(e) => (setInstraProfile(e.target.value))}
                        />
                    </Form.Group>

                    <Button
                        className="my-5"
                        variant="primary"
                        type="submit"
                        id="regSubmit"
                        style={{ marginRight: "1rem" }}
                    >
                        SAVE
                    </Button>


                </Form>
            </Container>
        </div>
    )
}

export default ProfileEdit