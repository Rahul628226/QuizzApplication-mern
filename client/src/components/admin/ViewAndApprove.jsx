import { Box, Button, Card, CardActions, CardContent, FormControlLabel, Radio, RadioGroup, Typography, } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
import PublicHeader from '../Header/PublicHeader';


const ViewAndApprove =()=>{
    const naviagate = useNavigate(); //for navigation purpose
    const [quizData, setQuizData] = useState([]);
    const location = useLocation();
    const {id} = location.state || {id:null}

    useEffect(() => {
        axios.get("http://localhost:4010/quiz")
            .then((res) => {
                console.log(res.data);
                const quiz = res.data.find((quizItem) => quizItem._id === id);
                if (quiz) {
                    setQuizData(quiz);
                    console.log(quizData);
                  
                }
            })
            .catch((err) => console.log(err));
    }, []);

    // Check if quizData is empty or undefined
    if (!quizData || quizData.length === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant='h6'>Loading...</Typography>
        </div>
      );
    }
    const approveQuiz=(id)=>{
        const quizData ={
            status:'approved',
        }
        axios.put(`http://localhost:4010/quizupdate/${id}`,quizData
        )
        .then((res) => {
            console.log('Quiz Updated:', res.data);
            alert("Approved Successfully");
           naviagate('/viewallPending');
            
        })
        .catch((err) => {
            alert('error');
            console.log(err);

        });

    }

    const rejectQuiz=(id)=>{
        const updateData ={
            status:'rejected',
        }
        axios.put(`http://localhost:4010/quizupdate/${id}`,updateData)
        .then(()=>{
            alert("Rejected Successfully");
            naviagate('/viewallPending');
        })
        .catch((err)=>{
            alert("SomthingWrong Please try it later");
        })
    }
    return(
         
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',backgroundColor:'#c71585'}}>
           <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                border='2px solid #ccc'
                padding='20px'
                bgcolor='#8fbc8f'
            >
                <div style={{ display: 'grid', gap: '20px', paddingBottom: '60px', paddingTop: '30px', padding: '20px' }}>
                <Card>
                        <CardContent>
                        <Typography variant='h6' style={{fontWeight:'bold'}}>Quiz Created by  :- {quizData.userId}</Typography>
                            <Typography variant='h6'>{quizData.topic}</Typography>
                            <Typography variant='body1'>{quizData.sub}</Typography>
                        </CardContent>
                        <CardContent>
                            {quizData.questions.map((question, index) => (
                                <div key={index}>
                                    <Typography variant='subtitle1'>{`Question ${index + 1}: ${question.question}`}</Typography>
                                    <RadioGroup>
                                        {question.options.map((option, optIndex) => (
                                            <FormControlLabel
                                                key={optIndex}
                                                value={option}
                                                control={<Radio />}
                                                label={option}
                                            />
                                            
                                        ))}
                                    </RadioGroup>
                                    <Typography variant='subtitle1'>CorrectAnswer :{question.correctAnswer}</Typography>
                                </div>
                            ))}
                        </CardContent>
                        <CardActions>
                            <Button  variant='contained' color='primary' onClick={()=>{approveQuiz(quizData._id)}}>Approve</Button><br/>
                            <Button variant='contained' color='error' onClick={()=>{rejectQuiz(quizData._id)}}>Reject</Button>
                        </CardActions>
                    </Card>

                </div>

            </Box>

        </div>
    )
}

export default ViewAndApprove