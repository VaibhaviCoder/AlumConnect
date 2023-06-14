import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

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
   
    <Container style={{padding: '60px'}}>
        <div style={{backgroundColor: '#f5f5f5', padding: '20px'}}>
    {checkLogin() ? 
    <div style={{backgroundColor: '#fff', padding: '20px', borderRadius: '10px'}}>
        <button onClick={logoutHandler} style={{backgroundColor: '#ff69b4', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px'}}>Log Out</button>
        <div className="profilec1" style={{display:"flex"}}>
            
            <img style={{height:"500px",width:"300px",display:'inline-block',padding:'1rem'}} src="https://i.pinimg.com/originals/23/8e/da/238eda563b69121eb09081070725e8f8.jpg" alt="profileimage" />
            <div className="profilec2" style={{display:"flex",flexDirection:"column"}}>
            <h1 style={{color: '#ff69b4', margin: '20px 0'}}>Name {user.name}</h1>
            <h3 style={{color: '#333', margin: '10px 0'}}>Email :- {user.email}</h3>
            <h3 style={{color: '#333', margin: '10px 0'}}>Phone :- {user.phoneNumber}</h3>
            <h3 style={{color: '#333', margin: '10px 0'}}>Branch :- {user.branch}</h3>
            <h3 style={{color: '#333', margin: '10px 0'}}>Batch :- {user.graduationYear}</h3>
            </div>
        </div>
    </div> 
      : null} 
    </div>
</Container>
  )
}
export default  Profile;