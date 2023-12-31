import React, { useState, useEffect } from 'react';
import './ExplorePlus.css';
import Explore3 from './Explore3';
import axios from 'axios';
import Footer from './Footer'
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ExplorePlus = () => {
  const navigate=useNavigate();
  const SERVER_CONFIG = process.env.REACT_APP_NOT_SECRET_CODE;
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
  const [Loading, setLoading] = useState(true);
  const [BranchData, setBranchData] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
   
  };

  const handlebranchclick = (branch) => {
     navigate('/branch',{
       state:{
          branch:{branch}
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

  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  async function fetchBranchData(branch) {
    try {
      const res = await axios.get(`${SERVER_CONFIG}/api/v1/alumni/branch?branch=${branch}`);

      return { branch, data: res.data.data };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    async function loadData() {
      const branchDataPromises = Object.values(Branch).map(async (branch) => {
        return fetchBranchData(branch);
      });

      const branchData = await Promise.all(branchDataPromises);
      // console.log(branchData);
      const filteredData = branchData.filter(data => data !== null);
      setBranchData(filteredData);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div className='epc1'>
      <div className="headerpage">
        <div className="secondtitle">
              
              <h1 style={{ color:'white'}}>MIT, Muzaffarpur Alumni Community </h1>
              <p>Welcome to our alumni community! This is your gateway to connect with us and over 10,000 former Mitian around the world</p>
          
          </div>
      </div>
      <div className="epc2">
        <Dropdown className='epc3'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilterSelect('Branch')}>Branch</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterSelect('Batch')}>Batch</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {selectedFilter === 'Branch' && (
          <Dropdown className='epc3'>
            <Dropdown.Toggle variant="success" id="dropdown-branch">
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
        )}
        {selectedFilter === 'Batch' && (
          <Dropdown className='epc3'>
            <Dropdown.Toggle variant="success" id="dropdown-branch">
              Select Batch
            </Dropdown.Toggle>

            <Dropdown.Menu className='epc6'>
              {generateBatchOptions().map((batch,index) => (
                <Dropdown.Item key={index} onClick={()=>handlebatchclick(batch)}>
                  {batch}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
        {/* <input
          type="text"
          className="form-control epc4"
          onChange={handleSearch}
          value={searchTerm}
        /> */}
      </div>
      {!Loading && BranchData.map((data, index) => {
        if (data.data.length)
          return <Explore3 key={index} id={index} data={data.data} branch={data.branch} />
        else return null;
      })}
      <Footer/>
    </div>
  );
}

export default ExplorePlus;
