import React from 'react'
import './PublicUserProfile.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { IoLocation } from 'react-icons/io5'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa"


const PublicUserProfile = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [userId, setUserId] = useState();
  const [profileData, setProfileData] = useState();
  const [auth, setAuth] = useState(false);
  const [connectBtnValue, setValue] = useState();

  async function handleConnectino() {
    const res = await axios.post(`${SERVER_CONFIG}/api/v1/newconnection`, {
      status: 'pending',
      sender: userId.id,
      receiver: id,
    });
    setValue(res.data.data.connection_status);


  }
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
            const response = await axios.get(`${SERVER_CONFIG}/api/v1/auth`, {
              headers: {
                xaccesstoken: token
              }
            });
            setUserId(response.data.data);
            setAuth(true);
            try {
              const response = await axios.get(`${SERVER_CONFIG}/api/v1/alumni/userProfile/${id}`);
              // console.log(response.data);
              setData(response.data.data);
              const profile = await axios.get(`${SERVER_CONFIG}/api/v1/profile?id=${id}&auth=true`);



              setProfileData(profile.data);
            } catch (error) {
              setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
            }

          } catch (error) {
            localStorage.removeItem('userInfo');
            setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
          }




        } else {
          const response = await axios.get(`${SERVER_CONFIG}/api/v1/alumni/userProfile/${id}`);
          // console.log(response.data);
          setData(response.data.data);

          const profile = await axios.get(`${SERVER_CONFIG}/api/v1/profile?id=${id}&auth=false`);
          setProfileData(profile.data);
        }


      } catch (error) {
        setError(`${error.response.data.error.explanation}, StatusCode:${error.response.data.error.statusCode}`);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const connectionStatus = await axios.get(`${SERVER_CONFIG}/api/v1/newconnection/${userId.id}/${id}`);
      
        if (connectionStatus.data.data) {
          setValue(connectionStatus.data.data.connection_status);
        }
        else {
          const connectionStatus = await axios.get(`${SERVER_CONFIG}/api/v1/newconnection/${id}/${userId.id}`);
         
          if (connectionStatus.data.data) {
            setValue(connectionStatus.data.data.connection_status);
          }
          else
          setValue('Connect');
        }

      }
    }
    fetchData();
  }, [userId, SERVER_CONFIG, id])



  return (
    <div className='PublicUserProfile'>
      <div className='header_box'> </div>
      <div className="pupc1">
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
          {data && <span>Branch:- {data.branch}</span>}
          {data && <p>GraduationYear:- { data.graduationYear}</p>}
          {profileData && profileData.location && profileData.location !== 'null' && <h4 className="profile-info"><IoLocation size={20} style={{ color: "rgb(12, 199, 242)" }} />{profileData.location}</h4>}
          
          {
            auth === true ? (
              (id != userId.id) && connectBtnValue && <button className='pupc1c3btn' onClick={handleConnectino} disabled={connectBtnValue !== 'Connect'}>{connectBtnValue}</button>
            ) : (
              <button className='pupc1c3btn' onClick={handleJoinNow}>Join to View Profile</button>
            )
          }
        </div>
        <div className="scnc1">
          {profileData && profileData.linkdin_id && profileData.linkdin_id !== 'undefined' && profileData.linkdin_id !== 'null' ? (
            <a href={profileData.linkdin_id} target="_blank" rel="noreferrer">
              <FaLinkedinIn size={30} style={{ color: "rgb(11, 199, 242)" }} />
            </a>
          ) : (
            <span>
              <FaLinkedinIn size={30} style={{ color: "rgb(109, 137, 182)" }} />
            </span>
          )}

          {profileData && profileData.twitter_id && profileData.twitter_id !== 'undefined' && profileData.twitter_id !== 'null' ? (
            <a href={profileData.twitter_id} target="_blank" rel="noreferrer">
              <FaTwitter size={30} style={{ color: "rgb(11, 199, 242)", marginLeft: "1rem" }} />
            </a>
          ) : (
            <span>
              <FaTwitter size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} />
            </span>
          )}

          {profileData && profileData.github_id && profileData.github_id !== 'undefined' && profileData.github_id !== 'null' ? (
            <a href={profileData.github_id} target="_blank" rel="noreferrer">
              <FaGithub size={30} style={{ color: "rgb(11, 199, 242)", marginLeft: "1rem" }} />
            </a>
          ) : (
            <span>
              <FaGithub size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} />
            </span>
          )}

          {profileData && profileData.facebook_id && profileData.facebook_id !== 'undefined' && profileData.facebook_id !== 'null' ? (
            <a href={profileData.facebook_id} target="_blank" rel="noreferrer">
              <FaFacebook size={30} style={{ color: "rgb(11, 199, 242)", marginLeft: "1rem" }} />
            </a>
          ) : (
            <span>
              <FaFacebook size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} />
            </span>
          )}

          {profileData && profileData.instragram_id && profileData.instragram_id !== 'undefined' && profileData.instragram_id !== 'null' ? (
            <a href={profileData.instragram_id} target="_blank" rel="noreferrer">
              <FaInstagram size={30} style={{ color: "rgb(11, 199, 242)", marginLeft: "1rem" }} />
            </a>
          ) : (
            <span>
              <FaInstagram size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} />
            </span>
          )}

        </div>

      </div>
    </div>
  )
}

export default PublicUserProfile