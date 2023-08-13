import { Box, Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import Main from './Main';

const ViewAllPending = () => {
    const [dt,setDt] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:4010/quiz")
        .then((res)=>{
            const quizdt = res.data.filter((quizItem)=>quizItem.status === 'pending');
            setDt(quizdt);
           
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const HandleOpenMore=(id)=>{
        navigate('/viewAndApprove',{
            state:{id:id},
        },
        
        );

    }

    const NavigateToHome=()=>{
        // navigate('/adminhome')
    }

   

  return (
    <>
      <AdminHeader/>
      <Main/>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',  minHeight: '100vh',paddingTop:'70px',paddingLeft:'230px' }}>
      <Typography variant='h3' style={{ marginBottom: '20px',color:'#ffffff' }}>Approve Quiz</Typography>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#D9E3F0',
          padding: '20px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', padding: '20px' }}>
          {/* Card Component */}
          {dt.map((value,i)=>(
             <Card key={i}>
             <CardMedia>
                <Box color='#708090'>
                <Typography variant='h3'>{value.topic}</Typography>

                </Box>
               
             </CardMedia>
             <CardContent>
               <Button variant='contained' color='primary'onClick={()=>HandleOpenMore(value._id)}>
                 Open
               </Button>
               <Button  onClick={NavigateToHome}>Cancel</Button>
               
             </CardContent>
           </Card>
          ))}
         
          {/* End of Card Component */}
        </div>
      </Box>
    </div>
    </>
  );
};

export default ViewAllPending;
