import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography,IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Button,
//   Box,
//   IconButton,
// } from '@mui/material';

import Header from '../Common/Heder';



const Login = () => {

    const [email,setemail] = useState('');
    const [password,setPassword] = useState('');

    const [openDialog,setOpenDialog] = useState(false);

    const navigate = useNavigate();

    const UserLogin=()=>{

        if(email === 'admin@gmail.com' && password === 'admin'){
            navigate('/adminhome', {
            state:{userRole:'admin',
                email:email,
        },
    });
        }
        else{
            if(!email || !password){
                alert("Please fill all the field");
                return;
            }
             axios.post('http://localhost:4010/login',{email,password})
             .then((response)=>{
                console.log(response.data);
                alert(response.data);
                if(response.data === 'Success'){
                   setOpenDialog(true);
                }
             })
             .catch((err)=>{
                console.log(err);
                alert("Username or password incorrect");
             });
    

        }

        
    }

    // dialog close
    const handleCloseDialog=()=>{
        setOpenDialog(false);
    }
    // switch as moderator
    const SwitchToModerator=()=>{
        navigate('/moderatorhome',{
            state: {
                userRole:'moderator',
                email:email
            },
        });
        handleCloseDialog();
    }

    // switch as public
    const SwitchToPublic=()=>{
        navigate('/publichome',{
            state: { 
                userRole:'public',
                email:email,
             },
            });
        handleCloseDialog();
    }

  return (
    <>
    <Header/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#C7EAE8' }}>
    <Box sx={{ bgcolor: '#fffaf0', height: '40vh', width: '40vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center',paddingTop:'40px' }}>
        <Typography variant='h5'>Login</Typography>
        <TextField
            label='UserName'
            margin='normal'
            variant='outlined'
            value={email}
            onChange={(e)=>setemail(e.target.value)}
        />
        <TextField
            label='Password'
            type='password'
            margin='normal'
            variant='outlined'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', margin: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', margin: '10px' }}>
        <Link to="/"> <Button  >Cancel</Button></Link>
           
            
        </div>
            <Button onClick={UserLogin} >Login</Button>
        </div>
        <div style={{ justifyContent: 'flex-start', paddingBottom: '20px', paddingLeft: '10px' }}>
            <p style={{ color: 'red', cursor: 'pointer' }}>Forgot Password?</p>
        </div>
    </Box>
    {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select which mode you want to login</DialogTitle>
        <DialogContent>
            <Button onClick={SwitchToModerator}>Moderator</Button>
            <Button onClick={SwitchToPublic}>Public</Button>
        </DialogContent>

    </Dialog> */}

<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth fullScreen style={{
          backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/006/691/884/small/blue-question-mark-background-with-text-space-quiz-symbol-vector.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Set the minimum height to fill the viewport
          paddingTop: '100px',
        }}>
      <DialogTitle >Select which mode you want to login</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center" paddingTop={'100px'}>
          <IconButton onClick={SwitchToModerator}>
            <img src="https://cdn-icons-png.flaticon.com/512/4010/4010411.png" alt="Moderator" width="150" height="150" /><br></br>
          
          </IconButton>
          <IconButton onClick={SwitchToPublic}>
            <img src="data:image/jpeg;base64,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" alt="Public" width="150" height="150" />
          </IconButton>
          
        </Box>
        <div>
        
        </div>
      </DialogContent>
    </Dialog>
</div>
    </>
  )
}

export default Login
