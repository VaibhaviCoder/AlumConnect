import './NavbarStyles.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa"
import { Dropdown } from 'react-bootstrap'
<link href='https://fonts.googleapis.com/css?family=Roboto:500,900,100,300,700,400' rel='stylesheet' type='text/css'></link>
const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [color, setColor] = useState(false);
    const navigate = useNavigate();
    const getCurrentYear = () => {
        const date = new Date();
        return date.getFullYear();
      };
      const generateBatchOptions = () => {
        const currentYear = getCurrentYear();
        const options = [];
        for (let year = currentYear; year >= 1950; year--) {
          options.push(<option key={year}>{year}</option>);
        }
        return options;
      };

    const Branch = {
        1: 'Information Technology',
        2: 'Mechenical Engineering',
        3: 'Electrical Engineering',
        4: 'Civil Engineering',
        5: 'Leather Technology',
        6: 'B. Pharmacy',
        7: 'Biomedical and Robotics Engineering',
        8: 'Electronics and Communication Engineering'
    };
    const handlebranchclick = (branch) => {
        navigate('/branch', {
            state: {
                branch: { branch }
            }
        })
    };

    const handlebatchclick = (e) => {
        // console.log("batch in explore",batch);
         navigate('/batch',{
          state:{
            batch:e.key
          }
         })
      };
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        }
        else {
            setColor(false);
        }
    };
    window.addEventListener("scroll", changeColor);
    return (
        <div className={color ? "header header-bg" : "header"}>
            <Link to="/">
                <h1>ALUMCONNECT</h1>
            </Link>
            <ul className={click ? "nav-menu active" : "nav-menu fill"}>
                <li >
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                
                <li >
                    <Dropdown >
                        <Dropdown.Toggle variant="outline-warning" id="dropdown-branch" style={{color:"white"}}>
                            Select Branch
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='epc6'>
                            {Object.keys(Branch).map((key) => (
                                <Dropdown.Item key={key} onClick={() => handlebranchclick(Branch[key])}>
                                    {Branch[key]}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown >
                        <Dropdown.Toggle variant="outline-warning" id="dropdown-branch" style={{color:"white"}}>
                            Select Batch
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='epc6'>
                            {generateBatchOptions().map((batch, index) => (
                                <Dropdown.Item key={index} onClick={() => handlebatchclick(batch)}>
                                    {batch}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li >
                    <Link to="/profile">Sign In</Link>
                </li>
                <li >
                    <Link to="/Contact">Contact</Link>
                </li>

            </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? <FaTimes size={20} style={{ color: "#fff" }} /> :
                    <FaBars size={20} style={{ color: "#fff" }} />}
            </div>
        </div>
    )
}

export default Navbar;