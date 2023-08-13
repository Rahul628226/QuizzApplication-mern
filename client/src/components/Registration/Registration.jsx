import React, { useState } from 'react'
import { Box, Button,  TextField } from '@mui/material';
import axios from 'axios';
import Header from '../Common/Heder';


const Registration = () => {

    const [inputData, setInputData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        type:''
    })

    // const [userSelectionDialog,setuserSelectionDialog] = useState(false);

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setInputData((inputData)=>({...inputData,[name]:value}));
        console.log(inputData);
        
    }

    const RegisterUser = () => {
       // required field validation
       if (!inputData.name || !inputData.email || !inputData.password || !inputData.confirmPassword) {
        alert('Please fill in all the required fields.');
        return;
      }

        //   email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputData.email)) {
        alert('Please enter a valid email address.');
        return;
        }
        if (inputData.password === inputData.confirmPassword) {
          axios
            .post("http://localhost:4010/reg", inputData)
            .then(() => {
              alert("Registered Successfully");
              setInputData({
                name:'',
                email:'',
                password:'',
                confirmPassword:'',
                type:''

              })
           
            })
            .catch((err) => {
              alert("Error: Registration failed. Please try again later.");
            });
        } else {
          alert("Error: Passwords do not match.");
        }
      };
        
    // dialoge by select the type of user
      // const handleDialogOpen=()=>{
       

      //   if(inputData.password ===inputData.confirmPassword){
      //       setuserSelectionDialog(true);
      //   }
      //   else{
      //       alert("confirm password mismatch");
      //   }
      //   }
        
 

    // const handleModeratorClick = () => {
    //     setInputData((inputData) => ({ ...inputData, type: 'moderator' }));
    //     console.log(inputData)
    //     RegisterUser(inputData);
    //     handleCloseDialog();
    //   };
    
    //   // Set type to 'public' and close the dialog box
    //   const handlePublicClick = () => {
    //     setInputData((prevData) => ({ ...prevData, type: 'public' }));
    //     RegisterUser(inputData);
    //     handleCloseDialog();
       
       
    //   };
  
    
      
    
    //   close the dialog box
      // const handleCloseDialog = () => {
      //   setuserSelectionDialog(false);
      // };
   
  return (
    <>
    <Header/>
        <div style={{ paddingTop: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
      <Box style={{ p: 3, bgcolor: '#cfe8fc', display: 'flex', flexDirection: 'column', alignItems: 'center',width:'60vh' }}>
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
        <Button variant='contained' style={{backgroundColor:'#c71585'}}
        onClick={RegisterUser}
        
        >
          SignIn
          </Button>
      </Box>
    </div>
    {/* <Dialog open={userSelectionDialog} onClose={handleCloseDialog} >
        <DialogTitle>Select the UserType</DialogTitle>
        <DialogContent>
            <Button onClick={handleModeratorClick}>Moderator</Button> 
            <Button onClick={handlePublicClick}>Public</Button>
        </DialogContent>

    </Dialog> */}
    </>
    
  )
}

export default Registration
