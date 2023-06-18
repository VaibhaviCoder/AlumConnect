import "./Footer.css"

import React from 'react'
import { FaGithub, FaLinkedinIn, FaMailBulk } from "react-icons/fa"
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="left">
                    <h2 className="title-touch">Living, learning, & leveling up one day at a time.</h2>

                </div>
                <div className="right">

                    <a href="https://www.linkedin.com/in/utkarshkr09/"><FaLinkedinIn size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a >


                    <a href="mailto:2016krutkarsh@gmail.com"><FaMailBulk size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a >


                    <a href="https://github.com/utkarshkr-creator/Some-Cool-CP-Problems"><FaGithub size={20} style={{ color: "#fff", marginRight: "2rem" }} />
                    </a >

                </div>
            </div>
        </div>
    )
}

export default Footer