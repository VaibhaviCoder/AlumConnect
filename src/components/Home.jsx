import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();
    async function onclickhandler(){
        navigate('./profile')
    }
    return (
        <div className='homecontainer'>
            <div className="first">

            </div>
            <div className="second">
            
                <div className="secondtitle">
            
                    <h1 style={{ color:'white'}}>MIT, Muzaffarpur Alumni Community </h1>
                    <p>Welcome to our alumni community! This is your gateway to connect with us and over 10,000 former Mitian around the world</p>
                   <button className='homeBtn'> EXPLORE</button>
                   <button className='homeBtn' onClick={onclickhandler}> SIGN IN</button>
                </div>
            </div>
        </div>
    )
}

export default Home