import React from 'react'
import './PublicUserProfile.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { IoLocation } from 'react-icons/io5'

const PublicUserProfile = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [profileData, setProfileData] = useState();
  const [auth, setAuth] = useState(false);
  const checkLogin = () => {
    if (localStorage.getItem('userInfo')) {
      return true;
    } else {
      return false;
    }
  }
  function handleJoinNow() {
    navigate('/register')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id && checkLogin()) {

          // console.log("toke",localStorage.getItem('userInfo'));
          const token = localStorage.getItem('userInfo');
          try {
            const  response  = await axios.get('http://localhost:3300/api/v1/auth', {
              headers: {
                xaccesstoken: token
              }
            });
            setAuth(true);

          } catch (error) {
            localStorage.removeItem('userInfo');
            setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
          }

          try {
            const response = await axios.get(`http://localhost:3300/api/v1/alumni/userProfile/${id}`);
            // console.log(response.data);
            setData(response.data.data);
            const profile = await axios.get(`http://localhost:3300/api/v1/profile?id=${id}&auth=true`);
            setProfileData(profile.data);
          } catch (error) {
            setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
          }


        } else {
          const response = await axios.get(`http://localhost:3300/api/v1/alumni/userProfile/${id}`);
          // console.log(response.data);
          setData(response.data.data);

          const profile = await axios.get(`http://localhost:3300/api/v1/profile?id=${id}&auth=false`);
          setProfileData(profile.data);
        }


      } catch (error) {
        setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
      }
    };

    fetchData();
  }, [id]);



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
          {data && <h4>{data.name}</h4>}
          {profileData && profileData.designation !== 'null' && <p >{profileData.designation}</p>}
          {profileData && profileData.location && profileData.location !== 'null' && <h4 className="profile-info"><IoLocation size={20} style={{ color: "rgb(12, 199, 242)" }} />{profileData.location}</h4>}
          {
            auth === true ? (
              <button className='pupc1c3btn'>Connect</button>
            ) : (
              <button className='pupc1c3btn' onClick={handleJoinNow}>Join to View Profile</button>
            )
          }


        </div>

      </div>
    </div>
  )
}

export default PublicUserProfile