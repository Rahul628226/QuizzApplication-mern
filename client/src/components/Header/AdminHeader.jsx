import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AdminHeader = () => {

  // const location = useLocation();
  // const {email} = location.state;

  return (
    <div>
    <AppBar
      style={{
        backgroundColor: '#c71585'
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center',paddingLeft:'200px' }}>
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
            Quiz App
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
          style={{
            fontFamily:'cursive',
            color:'#f5fffa',

          }}
          >
            Admin : admin@gmail.com
          </Typography>

        </div>
        
      </Toolbar>
    </AppBar>
  </div>
  )
}

export default AdminHeader
