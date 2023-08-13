import React from 'react'
import { useLocation } from 'react-router-dom'
import PublicHeader from '../Header/PublicHeader';
import { Typography } from '@mui/material';

const Result = () => {

    const location=useLocation();
    const {score} = location.state
  return (<>
    
<PublicHeader />
<div >
    <br /><br /><br /><br /><br /><br /><br /><br />
    <Typography variant='h1'>Result {score}</Typography>
    </div>
    </>
  )
}

export default Result