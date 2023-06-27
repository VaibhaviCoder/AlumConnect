import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

import { FaHome } from 'react-icons/fa'
import { BiLogOut, BiEdit } from 'react-icons/bi'
import { MdEngineering } from 'react-icons/md'
import { SlCalender } from 'react-icons/sl'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa"
import { IoLocation } from 'react-icons/io5'

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [ProfileData, setProfileData] = useState();
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');

  }
  function icononclickhandler() {
    navigate('/');
  }
  function edithandler() {
    navigate(`/pedit/${ProfileData.id}`, {
      state: {
        id: ProfileData.id,
        addres: ProfileData.location,
        design: ProfileData.designation,
        linkdinProfile: ProfileData.linkdin_id,
        twitterProfile: ProfileData.twitter_id,
        instraProfile: ProfileData.instragram_id,
        gitProfile: ProfileData.github_id,
        fbProfile: ProfileData.facebook_id
      }
    })

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (checkLogin()) {
          // console.log("toke",localStorage.getItem('userInfo'));
          const token = localStorage.getItem('userInfo');
          const { data } = await axios.get('http://localhost:3300/api/v1/alumni/profile', {
            headers: {
              xaccesstoken: token
            }
          });
          const profile = await axios.get(`http://localhost:3300/api/v1/profile/${data.data.id}`);
          setProfileData(profile.data);
          // console.log(picture.data);
          setAuth(true);
          setUser(data.data);
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
  const checkLogin = () => {
    if (localStorage.getItem('userInfo')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container className="profile-container">
      <BiEdit size={30} onClick={edithandler} style={{ position: "relative", left: "0", cursor: "pointer" }} />
      <BiLogOut size={30} onClick={logoutHandler} style={{ color: "#ff69b4", marginRight: "2rem", position: "absolute", top: "20px", right: "0px", cursor: "pointer" }} />
      <div className="profile-wrapper">
        {(!auth ? checkLogin() : auth) ? (
          <div className="profile-content">

            <FaHome onClick={icononclickhandler} size={30} style={{ color: "#ff69b4", marginRight: "2rem", position: "absolute", top: "20px", left: "20px", cursor: "pointer" }} />
            <div className="profile-section">
              {ProfileData &&
                <div className="pic1">
                  <img
                    className="profile-image"
                    src={`data:${ProfileData.contentType};base64,${ProfileData.data}`}
                    alt="profileimage"
                  />
                  <div className="scnc1">
                    {ProfileData.linkdin_id &&
                      <a href={ProfileData.linkdin_id} target='_blank' rel='noreferrer' ><FaLinkedinIn size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} /></a>
                    }
                    {ProfileData.twitter_id &&
                      <a href={ProfileData.twitter_id} target='_blank' rel='noreferrer' ><FaTwitter size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} /></a>
                    }
                    {ProfileData.github_id &&
                      <a href={ProfileData.github_id} target='_blank' rel='noreferrer' ><FaGithub size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} /></a>
                    }
                    {ProfileData.facebook_id &&
                      <a href={ProfileData.facebook_id} target='_blank' rel='noreferrer' ><FaFacebook size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} /></a>
                    }
                    {ProfileData.instragram_id &&
                      <a href={ProfileData.instragram_id} target='_blank' rel='noreferrer' ><FaInstagram size={30} style={{ color: "rgb(109, 137, 182)", marginLeft: "1rem" }} /></a>
                    }
                  </div>
                </div>}
              <div className="profile-details">
                <h1 className="profile-name" style={{ marginBottom: "0px" }}>{user.name}</h1>
                {ProfileData && ProfileData.designation && <p >{ProfileData.designation}</p>}
                {ProfileData && ProfileData.location && <h4 className="profile-info"><IoLocation size={30} style={{ color: "rgb(12, 199, 242)" }} />{ProfileData.location}</h4>}
                <h4 className="profile-info"><i class="fa fa-envelope" aria-hidden="true" style={{ color: "rgb(11, 199, 242)" }}></i> {user.email}</h4>
                <h4 className="profile-info"><i class="fa fa-phone-square" aria-hidden="true" style={{ color: "rgb(11, 199, 242)" }}></i> {user.phoneNumber}</h4>

                <h4 className="profile-info"><MdEngineering size={30} style={{ color: "rgb(11, 199, 242)" }} /> {user.branch}</h4>
                <h4 className="profile-info"><SlCalender size={30} style={{ color: "rgb(11, 199, 242)" }} /> {user.graduationYear}</h4>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );

}
export default Profile;