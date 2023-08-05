import React from 'react'
import { Alert, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Explore2 from './Explore2';
import './ExplorePlus.css'

const Branch = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const query = location.state.branch.branch;
    const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;
    // console.log(location);
    const [data, setData] = useState();
    // console.log(branch);
    function handleclick(){
        // console.log("heelo");
        navigate('/explore');
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${SERVER_CONFIG}/api/v1/alumni/branch?branch=${query}`);
                setData(res.data.data);
            } catch (error) {
                console.log(error);
            }


        }
        fetch();
    }, [query, SERVER_CONFIG])
    return (
        <>
        <div className='header_box'> </div>
        <div className='b1c1'>
            <Button variant="light" onClick={handleclick}>Back</Button>
            <div className="b2c1">
                <Alert key="dark" variant="dark" style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                    {query}
                </Alert>
                <div className="ex3c3">
                    {data && Object.keys(data).map((key, index) => (
                        <Explore2
                            key={index}
                            name={data[key].name}
                            id={data[key].id}
                            graduationYear={data[key].graduationYear}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Branch