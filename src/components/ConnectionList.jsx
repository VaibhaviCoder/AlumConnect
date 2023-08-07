import React, { useState } from 'react'
import img1 from '../Assets/OIP.jpeg'
import './ConnectionList.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ConnectionList = ({receiver_id,sender_id, types}) => {
  // console.log(receiver_id)
  
  const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;
  const [oper,setOper]=useState(true);
  const [error,setError]=useState();
  const navigate=useNavigate();
  const [userData,setData]=useState();
  async function handleReject(){
      try {
         axios.patch(`${SERVER_CONFIG}/api/v1/newconnection?receiver_id=${receiver_id}&sender_id=${sender_id}`,{
          status:'rejected'
         })
      } catch (error) {
        setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
      }
      setOper(false);
  }

  function handleProfile(){
    if(types==='accepted')
    navigate(`/userProfile/${receiver_id}`)
    else 
    navigate(`/userProfile/${sender_id}`)
    
  }

  async function handleAccept(){
    try {
      await axios.patch(`${SERVER_CONFIG}/api/v1/newconnection?receiver_id=${receiver_id}&sender_id=${sender_id}`,{
       status:'accepted'
      });
   } catch (error) {
     setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
   }
   setOper(false);
  }
  useEffect(()=>{
        const fetchProfileInfo=async ()=>{
          let res;
          if(types==='accepted')
          res=await axios.get(`${SERVER_CONFIG}/api/v1/alumni/userProfile/${receiver_id}`);
         else
          res=await axios.get(`${SERVER_CONFIG}/api/v1/alumni/userProfile/${sender_id}`);

          // console.log(res);
          setData(res.data.data);
        }
        fetchProfileInfo();
  },[receiver_id,SERVER_CONFIG,types,sender_id])

  return (
    <div className='clc1' >
        
        {/* <img src={img1} alt={receiver_id }  className='clc1img'/> */}
        {userData && 
        <>
        <h4 className='clc1n1'> {userData.name} </h4>
        {oper && 
        <>
        <button className='btn btn-primary clc1btn' onClick={handleProfile}>View Profile</button>
        {types==='pending' && <button className='btn btn-primary clc1btn' onClick={handleAccept}>Accept</button>}
        {types==='pending' && <button className='btn btn-outline-danger clc1btn' onClick={handleReject}>Reject</button>}
        </>}
        </>}

    </div>
  )
}

export default ConnectionList