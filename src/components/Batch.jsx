import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Explore2 from './Explore2';
import './ExplorePlus.css';

const Batch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state.batch;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleclick() {
    navigate('/explore');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3300/api/v1/alumni/batch?batch=${query}`);
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className='b1c1'>
      <Button variant="secondary" onClick={handleclick}>Back</Button>
      <div className="b2c1">
        <Alert key="dark" variant="dark" style={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {query}
        </Alert>
        <div className="ex3c3">
          {loading ? (
            <p>Loading...</p>
          ) : data.length > 0 ? (
            Object.keys(data).map((key, index) => (
              <Explore2
                key={index}
                name={data[key].name}
                id={data[key].id}
                graduationYear={data[key].graduationYear}
              />
            ))
          ) : (
            <p >No data found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Batch;
