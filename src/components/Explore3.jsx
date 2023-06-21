import React from 'react';
import Explore2 from './Explore2';
import './ExplorePlus.css';
import Alert from 'react-bootstrap/Alert';

const Explore3 = ({ data, id, branch }) => {

  // console.log(branch);
  const variant = {
    1: 'primary',
    2: 'secondary',
    3: 'success',
    4: 'danger',
    5: 'warning',
    6: 'info',
    7: 'light',
    8: 'dark',
  };
  const randomValue = Math.floor(Math.random() * 7) + 1;
  return (
    
    <div className='ex3c1'>
       
      <Alert key="info" variant={variant[randomValue]} style={{fontWeight:"bold", textTransform:"uppercase"}}>
        {branch}
      </Alert>
      <div className="ex3c3">
        {Object.keys(data).slice(0,6).map((key, index) => (
          <Explore2
            key={index}
            name={data[key].name}
            id={data[key].id}
            graduationYear={data[key].graduationYear}
          />
        ))}
      </div>
    </div>
  );
}

export default Explore3;
