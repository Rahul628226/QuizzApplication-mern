import React, { useEffect, useState } from 'react';
import PublicHeader from '../Header/PublicHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Box, Card, CardMedia, Typography } from '@mui/material';
import Main12 from './Main12';
//import animatedIcon from './path/to/your/animated-icon.gif'; // Replace with the actual path to your GIF image

const PublicHome = () => {
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();
  const [dt, setDt] = useState([]);
  localStorage.setItem("email",email)

  const HandleOpenMore = (id) => {
    navigate('/attemptquiz', {
      state: { id: id, email: email },
    });
  };

  useEffect(() => {
    axios
      .get('http://localhost:4010/quiz')
      .then((res) => {
        console.log(res.data);
        setDt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Main12></Main12>
     <PublicHeader></PublicHeader>
      

      <div style={{ paddingLeft: '300px' }}>
        <h3>Public Home</h3>
        <h4>welcome {email}</h4><img src="https://blog.learnchamp.com/hubfs/Fragezeichen-1.gif" alt="Animated Icon" style={{ width: '100px', height: '100px' }} />


        
      </div>
    </>
  );
};

export default PublicHome;
