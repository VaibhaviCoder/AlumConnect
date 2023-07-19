import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from '../Assets/OIP.jpeg'
import './ExplorePlus.css';
import { useNavigate } from 'react-router-dom';



// bootstrap box
const Explore2 = ({name,id,graduationYear}) => {
    const navigate=useNavigate();   
    // console.log(id);
    function handleOnClick(){
        navigate(`/userProfile/${id}`)
    }
  
    const url="https://th.bing.com/th/id/R.3c16d440b457cbd4dc498d27a77bda22?rik=SZdTmhm8N1z1aA&riu=http%3a%2f%2fstatic.dnaindia.com%2fsites%2fdefault%2ffiles%2f2015%2f06%2f11%2f345509-hrithik-hi-res-2.jpg&ehk=XYyPchigNfdEAgJ3mQ3T%2bXMjUaeVxUf27uzY9EnRpgg%3d&risl=&pid=ImgRaw&r=0";

    return (
        <Card className='e2c1' onClick={handleOnClick}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
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