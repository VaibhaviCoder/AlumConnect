import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const logoutHandler = () =>{
        localStorage.removeItem('userInfo');
        navigate('/');

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(checkLogin()){
                    // console.log("toke",localStorage.getItem('userInfo'));
                    const token=localStorage.getItem('userInfo');
                    // console.log("its again   " , token);
                    const {data} = await axios.get('http://localhost:3300/api/v1/alumni/profile', {headers: {
                        xaccesstoken: token}
                    });
                    // console.log(data);
                    setUser(data.data);
                } else {   
                navigate('/login');
                }
                
            } catch (err) {
                navigate('/login');
            }
            
        }
        fetchData();
    },[navigate]);
    const checkLogin = () => {
        if(localStorage.getItem('userInfo')){
            return true;
        } else {
            return false;
        }
    }
    
    return (
        <Container className="profile-container">
          <div className="profile-wrapper">
            {checkLogin() ? (
              <div className="profile-content">
                <button onClick={logoutHandler} className="logout-button">
                  Log Out
                </button>
                <div className="profile-section">
                  <img
                    className="profile-image"
                    src="https://i.pinimg.com/originals/23/8e/da/238eda563b69121eb09081070725e8f8.jpg"
                    alt="profileimage"
                  />
                  <div className="profile-details">
                    <h1 className="profile-name">{user.name}</h1>
                    <h3 className="profile-info">Email: {user.email}</h3>
                    <h3 className="profile-info">Phone: {user.phoneNumber}</h3>
                    <h3 className="profile-info">Branch: {user.branch}</h3>
                    <h3 className="profile-info">Batch: {user.graduationYear}</h3>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      );
      
}
export default  Profile;