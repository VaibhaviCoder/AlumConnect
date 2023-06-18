import React from 'react'
import { useState } from 'react';
import './ExplorePlus.css';

const ExplorePlus = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
  return (
    <div className='epc1'>
        <div className="headerpage">
            
        </div>
        
        {/* <div className="form-group" >// searchbar
              <label>Search:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleSearch}
                value={searchTerm}
              />
            </div> */}
    </div>
  )
}

export default ExplorePlus