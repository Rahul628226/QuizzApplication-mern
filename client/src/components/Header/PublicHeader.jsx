import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material';



const PublicHeader = () => {

 const UserId = localStorage.getItem("email");

  return (
    <div>
    <AppBar
      style={{
        backgroundColor: '#c71585'
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center',paddingLeft:'100px' }}>
          <Typography
            variant={'h4'}
            
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#f5fffa',
              textDecoration: 'none',
              paddingLeft: '200px',

            }}
          >
             Quizz App
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
          style={{
            fontFamily:'cursive',
            color:'#f5fffa',

          }}
          >
            User :{UserId}
          </Typography>

        </div>
        
      </Toolbar>
    </AppBar>
  </div>
  )
}

export default PublicHeader
