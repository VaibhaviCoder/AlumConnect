import React from 'react'
import img1 from '../Assets/OIP.jpeg'
import './ConnectionList.css'
const ConnectionList = ({userid}) => {
  return (
    <div className='clc1'>
        <img src={img1} alt={userid}  className='clc1img'/>
        <h4 className='clc1n1'> name </h4>
        <button className='btn btn-primary clc1btn'>view profile</button>

    </div>
  )
}

export default ConnectionList