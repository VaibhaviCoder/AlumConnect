import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

import { BiLogOut, BiEdit } from 'react-icons/bi'
import { MdEngineering } from 'react-icons/md'
import { SlCalender } from 'react-icons/sl'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa"
import { IoLocation } from 'react-icons/io5'
import ConnectionList from './ConnectionList';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Profile = () => {
  const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);
  const [ProfileData, setProfileData] = useState();
  const [ConnectionData, setConnectionData] = useState();
  const [status,setStatus]=useState('pending');
  const {setLogedIn}=useContext(UserContext)
  var flag=1;
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setLogedIn(false)
    navigate('/');

  }
   
  function handleIconClick(){
       if(status==='pending'){
          setStatus('accepted');
       }
       else{
        setStatus('pending');
       }
  }

  function edithandler() {
    // console.log(ProfileData);
    navigate(`/pedit/${ProfileData.id}`, {
      state: {
        addres: ProfileData.location,
        design: ProfileData.designation,
        linkdinProfile: ProfileData.linkdin_id,
        twitterProfile: ProfileData.twitter_id,
        instraProfile: ProfileData.instragram_id,
        gitProfile: ProfileData.github_id,
        fbProfile: ProfileData.facebook_id
      }
    })
    // 
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (checkLogin()) {
          // console.log("toke",localStorage.getItem('userInfo'));
          const token = localStorage.getItem('userInfo');

          const { data } = await axios.get(`${SERVER_CONFIG}/api/v1/alumni/profile`, {
            headers: {
              xaccesstoken: token
            }
          })

          setUser(data.data);
          setAuth(true);
        } else {
          navigate('/login');
        }

      } catch (err) {
        console.log(err);
        navigate('/login');
      }

    }
    fetchData();
  }, [navigate]);


  useEffect(() => {
    const fetchProfile = async () => {
      if (auth && user && user.id) {
        try {
          const profile = await axios.get(`${SERVER_CONFIG}/api/v1/profile?id=${user.id}&auth=${auth}`);

          setProfileData(profile.data);

        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchProfile();
  }, [auth, user,SERVER_CONFIG]);
  useEffect(()=>{
    const fetchConnection = async () => {
      if (auth && user && user.id) {
        try {
          const res = await axios.put(`${SERVER_CONFIG}/api/v1/newconnection`, {
            status: status,
            id: user.id
          })
          // console.log(res.data);
          setConnectionData(res.data.data);

        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchConnection();
  },[status, user, SERVER_CONFIG,auth, flag]);

  const checkLogin = () => {
    if (localStorage.getItem('userInfo')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="profilecontainerbox">
      <div className='header_box'> </div>
      <Container className="profile-container">


        <BiEdit size={30} onClick={edithandler} style={{ color: "#ff69b4", position: "relative", left: "0", cursor: "pointer" }} />
        <BiLogOut size={30} onClick={logoutHandler} style={{ color: "#ff69b4", position: "relative", left: "10px", cursor: "pointer" }} />
        <div className="profile-wrapper">
          {(!auth ? checkLogin() : auth) ? (
            <div className="profile-content">

              {/* <FaHome onClick={icononclickhandler} size={30} style={{ color: "#ff69b4", marginRight: "2rem", position: "absolute", top: "20px", left: "20px", cursor: "pointer" }} /> */}
              <div className="profile-section">
                {ProfileData &&
                  <div className="pic1">
                    <img
                      className="profile-image"
                      src={`data:${ProfileData.contentType};base64,${ProfileData.data}`}
                      alt="profileimage"
                    />
                    <div className="scnc1">
                      {ProfileData.linkdin_id && ProfileData.linkdin_id !== 'undefined' && ProfileData.linkdin_id !== 'null' ? (
                        <a href={ProfileData.linkdin_id} target="_blank" rel="noreferrer">
                          <FaLinkedinIn size={30} style={{ color: "rgb(11, 199, 242)" }} />
                        </a>
                      ) : (
                        <span>
                          <FaLinkedinIn size={30} style={{ color: "rgb(109, 137, 182)" }} />
                        </span>
                      )}

                      {ProfileData.twitter_id && ProfileData.twitter_id !== 'undefined' && ProfileData.twitter_id !== 'null' ? (
                        <a href={ProfileData.twitter_id} target="_blank" rel="noreferrer">
                          <FaTwitter size={30} style={{ color: "rgb(11, 199, 242)", marginLeft: "1rem" }} />
                        </a>
                      ) : (
                        <span>
                          <FaTwitter size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} />
                        </span>
                      )}

                      {ProfileData.github_id && ProfileData.github_id !== 'undefined' && ProfileData.github_id !== 'null' ? (
                        <a href={ProfileData.github_id} target="_blank" rel="noreferrer">
                          <FaGithub size={30} style={{ color: "rgb(11, 199, 242)", marginLeft: "1rem" }} />
                        </a>
                      ) : (
                        <span>
                          <FaGithub size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} />
                        </span>
                      )}

                      {ProfileData.facebook_id && ProfileData.facebook_id !== 'undefined' && ProfileData.facebook_id !== 'null' ? (
                        <a href={ProfileData.facebook_id} target="_blank" rel="noreferrer">
                          <FaFacebook size={30} style={{ color: "rgb(11, 199, 242)", marginLeft: "1rem" }} />
                        </a>
                      ) : (
                        <span>
                          <FaFacebook size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} />
                        </span>
                      )}

                      {ProfileData.instragram_id && ProfileData.instragram_id !== 'undefined' && ProfileData.instragram_id !== 'null' ? (
                        <a href={ProfileData.instragram_id} target="_blank" rel="noreferrer">
                          <FaInstagram size={30} style={{ color: "rgb(11, 199, 242)", marginLeft: "1rem" }} />
                        </a>
                      ) : (
                        <span>
                          <FaInstagram size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} />
                        </span>
                      )}

                    </div>
                  </div>}
                <div className="profile-details">
                  <div className="profile-heading">
                    <h1 className="profile-name" style={{ marginBottom: "0px" }}>{user.name}</h1>
                    {ProfileData && ProfileData.designation !== 'null' && <p >{ProfileData.designation}</p>}
                  </div>
                  {ProfileData && ProfileData.location && <h4 className="profile-info"><IoLocation size={30} style={{ color: "rgb(12, 199, 242)" }} />{ProfileData.location}</h4>}
                  <h4 className="profile-info"><i className="fa fa-envelope" aria-hidden="true" style={{ color: "rgb(11, 199, 242)" }}></i> {user.email}</h4>
                  <h4 className="profile-info"><i className="fa fa-phone-square" aria-hidden="true" style={{ color: "rgb(11, 199, 242)" }}></i> {user.phoneNumber}</h4>

                  <h4 className="profile-info"><MdEngineering size={30} style={{ color: "rgb(11, 199, 242)" }} /> {user.branch}</h4>
                  <h4 className="profile-info"><SlCalender size={30} style={{ color: "rgb(11, 199, 242)" }} /> {user.graduationYear}</h4>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
      {ConnectionData  &&
        <div className='pc2'>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={handleIconClick}/>
              <label class="form-check-label" for="flexCheckDefault">
                Connected 
              </label>
          </div>

          {ConnectionData && Object.keys(ConnectionData).map((key, index) => (
            <ConnectionList key={index} receiver_id={ConnectionData[index].receiver_id} sender_id={ConnectionData[index].sender_id} types={status} flag={flag}/>
          ))}

          {/* <Explore3 key={0} /> */}
        </div>
      }
    </div>
  );

}
export default Profile;