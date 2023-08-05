import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import './ExplorePlus.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// bootstrap box


const Explore2 = ({ name, id, graduationYear }) => {
    const [profile, setProfile] = useState();
    const navigate = useNavigate();
    const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;
    // console.log(id);
    function handleOnClick() {
        navigate(`/userProfile/${id}`)
    }
    useEffect(() => {
        const fetchData = async () => {
            const profile = await axios.get(`${SERVER_CONFIG}/api/v1/profile?id=${id}&auth=false`);
            setProfile(profile.data);
        }
        fetchData();
    }, []);
    const url = "https://th.bing.com/th/id/R.3c16d440b457cbd4dc498d27a77bda22?rik=SZdTmhm8N1z1aA&riu=http%3a%2f%2fstatic.dnaindia.com%2fsites%2fdefault%2ffiles%2f2015%2f06%2f11%2f345509-hrithik-hi-res-2.jpg&ehk=XYyPchigNfdEAgJ3mQ3T%2bXMjUaeVxUf27uzY9EnRpgg%3d&risl=&pid=ImgRaw&r=0";

    return (
        <Card className='e2c1' onClick={handleOnClick}>
            <Card.Img
                variant="top"
                src={profile ? `data:${profile.contentType};base64,${profile.data}` : url}
                alt={name}
                className='e2c1img'
            />

            <Card.Body className='e2c2'>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    Batch: {graduationYear}
                </Card.Text>
                {/* <Button variant="primary">View Profile</Button> */}
            </Card.Body>
        </Card>
    )
}

export default Explore2