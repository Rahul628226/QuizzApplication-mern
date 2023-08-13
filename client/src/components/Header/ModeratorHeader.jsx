import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ModeratorHeader = () => {

  const location = useLocation();
  // const {email} = location.state;

  let email = localStorage.getItem("email");

  return (
    <div>
    <AppBar
      style={{
        backgroundColor: '#c71585'
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' ,paddingLeft:'200px' }}>
          <Typography
            variant={'h4'}
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#f5fffa',
              textDecoration: 'none',
              paddingLeft: '20px',
            }}
          >
            QuiZZ APP
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
          style={{
            fontFamily:'cursive',
            color:'#f5fffa',

          }}
          >
            User :{email}
          </Typography>

        </div>
        
      </Toolbar>
    </AppBar>
  </div>
  )
}

export default ModeratorHeader
