import { Box, Button, Dialog, DialogActions, DialogContent, Typography,TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profilePublic.css';
import Avatar from '@mui/material/Avatar';
import PublicHeader from '../Header/PublicHeader';
import Main12 from './Main12';

const Profile = () => {

    const [OpenDialog,setOpenDialog] =useState(false);

    const user = localStorage.getItem("email");
    console.log(user);

    const [profileData,setProfileData] = useState([]);

    // edit data
    const [inputData, setInputData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        type:''
    })

    useEffect(() => {
        axios.get("http://localhost:4010/userdata")
          .then((res) => {
            const profile = res.data.filter((item) => (item.email === user))
            console.log(profile);
            setProfileData(profile);
      
            if (profile.length > 0) { // Ensure there is a profile object
              setInputData({
                name: profile[0].name, // Use profile[0].name
                email: profile[0].email, // Use profile[0].email
                password: profile[0].password, // Use profile[0].password
              });
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }, []);
      



    const handleOpenDialog =()=>{
        setOpenDialog(true);
    }
    const handleClose=()=>{
        setOpenDialog(false);
    }


    const handleChange=(e)=>{
        const {name,value} = e.target;
        setInputData((inputData)=>({...inputData,[name]:value}));
        console.log(inputData);
        
    }
    const updateData=(id)=>{
        
        if(inputData.password === inputData.confirmPassword){
            axios.put(`http://localhost:4010/userUpdate/${id}`,inputData)
            .then(()=>{
                alert("Profile Updated Successfully");
                handleClose();
                window.location.reload();
            })
            .catch((err)=>{
                alert("Somthing wrong...Please try after sometime");
                console.log(err);
            })
        }
        else{
            alert("confirm Password Mismatch");
        }
       
    }

  return (
    <>
    <PublicHeader/>
    <Main12/>
    <div style={{paddingTop:'50px',display:'flex',justifyContent:'center',minHeight:'100vh',backgroundColor:'#dcdcdc',paddingLeft:'200px'}}>
        
        <Box
          height='50vh'
          width='100%' // Set the width to 100% for full width
          display="flex" // Use Flexbox to align items horizontally
          
          justifyContent='flex-start'
          border='2px solid #ccc'
          padding='20px'
          bgcolor='#f8f8ff'
        >
          <Avatar 
            alt="profilepic"
            src={require('../images/profilepic.jpg')}
            className="avatar-image"
            style={{ height: '300px', width: '300px' }}
          />
          <div style={{ marginLeft: '20px' , paddingTop:'100px'}}> 
            {profileData.map((val,i)=>(
              <div style={{ display: 'flex', justifyContent: 'space-between' }} key={i}>
                <Typography style={{margin:'20px', fontWeight:'bold',fontSize:'15px'}}>Hello</Typography>
                <Typography style={{margin:'20px', fontWeight:'bold',fontSize:'20px'}}> Mr.{val.name}</Typography><br/>
                <Typography style={{margin:'20px', fontWeight:'bold',fontSize:'20px'}}>{val.email}</Typography>

              </div>
            ))}
            
          </div>
          <div style={{paddingLeft:'200px'}}>
            <Button  variant='contained' style={{backgroundColor:'#c71585'}} onClick={handleOpenDialog}>Edit Profile</Button>
          </div>
        </Box>
        
       
    </div>
    <Dialog open={OpenDialog} onClose={handleClose}>
        <DialogContent>
        <div style={{ paddingTop: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
      <Box style={{ p: 3, bgcolor: '#cfe8fc', display: 'flex', flexDirection: 'column', alignItems: 'center',width:'60vh' }}>
        <Typography variant='h4'>Update Profile</Typography>
        <TextField
          label="Name"
          variant='filled'
          fullWidth
          sx={{ mb: 2 }} // Add margin at the bottom of the TextField
          name='name'
          value={inputData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email Id"
          variant='filled'
        //   type='email'
          fullWidth
          sx={{ mb: 2 }} // Add margin at the bottom of the TextField
          name='email'
          value={inputData.email}
          onChange={handleChange}
        />
       
       
        <TextField
          label="Password"
          variant='filled'
          fullWidth
          sx={{ mb: 2 }} // Add margin at the bottom of the TextField
          name='password'
          value={inputData.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          variant='filled'
          type='password'
          fullWidth
          sx={{ mb: 2 }} // Add margin at the bottom of the TextField
          name='confirmPassword'
          value={inputData.confirmPassword}
          onChange={handleChange}
        />
       
          </Box>
          </div>

        </DialogContent>
        {profileData.map((val,i)=>(
            <DialogActions key={i}>
            <Button variant='contained' style={{backgroundColor:'#c71585'}}
            onClick={()=>{updateData( val._id)}}
            >
              Update
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        ))}
        
            
        </Dialog>
    </>
  )
}

export default Profile;
