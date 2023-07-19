import React from 'react'
import './PublicUserProfile.css'
import {  useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { IoLocation } from 'react-icons/io5'

const PublicUserProfile = () => {
  const {id}=useParams();
  const user=id;
  const [data,setData]=useState();
  const [error,setError]=useState();
  const [profileData,setProfileData]=useState();
  // console.log(user);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/api/v1/alumni/userProfile/${user}`);
        // console.log(response.data);
        setData(response.data.data);
        const profile = await axios.get(`http://localhost:3300/api/v1/profile/${user}`);
        setProfileData(profile.data);
      } catch (error) {
        setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
      }
    };
  
    fetchData();
  }, [user]);
  return (
    <div className='PublicUserProfile'>
        <div className='header_box'> </div>
        <div className="profile-container pupc1">
           <div className="pupc1c1">
             <div className="pupc1c1c1" >
                {profileData && <img
                    className="pupc1c1c1img"
                    src={`data:${profileData.contentType};base64,${profileData.data}`}
                    alt="profileimage"
              />}
             </div>
           </div>
           
           <div className="pupc1c3">
              {data &&  <h4>{data.name}</h4>}
              {profileData && profileData.designation !== 'null' && <p >{profileData.designation}</p>}
              {profileData && profileData.location && profileData.location!=='null'  && <h4 className="profile-info"><IoLocation size={20} style={{ color: "rgb(12, 199, 242)" }} />{profileData.location}</h4>}
              <button className='pupc1c3btn'>Connect</button>
           </div>

        </div>
    </div>
  )
}

export default PublicUserProfile