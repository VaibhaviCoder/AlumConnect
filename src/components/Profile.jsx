import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

import {FaHome} from 'react-icons/fa'
import {BiLogOut, BiEdit} from 'react-icons/bi'
import {MdEngineering} from 'react-icons/md'
import {SlCalender} from 'react-icons/sl'

const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [auth,setAuth]=useState(false);
    const [pictureData,setPictureData]=useState();
    const logoutHandler = () =>{
        localStorage.removeItem('userInfo');
        navigate('/');

    }
    function icononclickhandler(){
      navigate('/');
   }
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(checkLogin()){
                    // console.log("toke",localStorage.getItem('userInfo'));
                    const token=localStorage.getItem('userInfo');
                    const {data} = await axios.get('http://localhost:3300/api/v1/alumni/profile', {headers: {
                        xaccesstoken: token}
                    });
                    const picture=await axios.get(`http://localhost:3300/api/v1/profilepic/${data.data.id}`);
                    setPictureData(picture.data);
        
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
    },[]);
    const checkLogin = () => {
        if(localStorage.getItem('userInfo')){
            return true;
        } else {
            return false;
        }
    }
    
    return (
        <Container className="profile-container">
          <BiEdit size={30} style={{position:"relative", left:"0"}}/>
          <BiLogOut size={30} onClick={logoutHandler} style={{ color: "#ff69b4", marginRight: "2rem", position:"absolute", top:"20px", right:"0px",cursor:"pointer" }}/>
          <div className="profile-wrapper">
            {(!auth?checkLogin():auth) ? (
              <div className="profile-content">
                 
                <FaHome onClick={icononclickhandler} size={30} style={{ color: "#ff69b4", marginRight: "2rem", position:"absolute", top:"20px", left:"20px",cursor:"pointer" }} />
                <div className="profile-section">
                  {pictureData && <img
                    className="profile-image"
                    src={`data:${pictureData.contentType};base64,${pictureData.data}`}
                    alt="profileimage"
                  />}
                  <div className="profile-details">
                    <h1 className="profile-name">{user.name}</h1>
                    <h3 className="profile-info"><i class="fa fa-envelope" aria-hidden="true" style={{color:"rgb(11, 99, 242)"}}></i> {user.email}</h3>
                    <h3 className="profile-info"><i class="fa fa-phone-square" aria-hidden="true" style={{color:"rgb(11, 99, 242)"}}></i> {user.phoneNumber}</h3>
                    
                    <h3 className="profile-info"><MdEngineering size={30} style={{color:"rgb(11, 99, 242)"}}/> {user.branch}</h3>
                    <h3 className="profile-info"><SlCalender size={30} style={{color:"rgb(11, 99, 242)"}}/> {user.graduationYear}</h3>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      );
      
}
export default  Profile;