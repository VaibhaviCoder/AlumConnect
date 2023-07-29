import React, { useState } from 'react'
import img1 from '../Assets/OIP.jpeg'
import './ConnectionList.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ConnectionList = ({connectonId}) => {
  // console.log(connectonId)
  const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;
  const [oper,setOper]=useState(true);
  const [error,setError]=useState();
  const navigate=useNavigate();
  const [userData,setData]=useState();
  async function handleReject(){
      try {
         axios.patch(`${SERVER_CONFIG}/api/v1/newconnection/${connectonId}`,{
          status:'rejected'
         })
      } catch (error) {
        setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
      }
      setOper(false);
  }
  function handleProfile(){
    navigate(`/userProfile/${connectonId}`)
  }

  function handleAccept(){
    try {
      axios.patch(`${SERVER_CONFIG}/api/v1/newconnection/${connectonId}`,{
       status:'accepted'
      })
   } catch (error) {
     setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
   }
   setOper(false);
  }
  useEffect(()=>{
        const fetchData=async ()=>{
          const res=await axios.get(`${SERVER_CONFIG}/api/v1/alumni/userProfile/${connectonId}`);
          // console.log(res);
          setData(res.data.data);
        }
        fetchData();
  },[connectonId,SERVER_CONFIG])

  return (
    <div className='clc1' onClick={handleProfile}>
        
        {/* <img src={img1} alt={connectonId }  className='clc1img'/> */}
        {userData && 
        <>
        <h4 className='clc1n1'> {userData.name} </h4>
        {oper && 
        <>
        <button className='btn btn-primary clc1btn' onClick={handleAccept}>Accept</button>
        <button className='btn btn-outline-danger clc1btn' onClick={handleReject}>Reject</button>
        </>}
        </>}

    </div>
  )
}

export default ConnectionList