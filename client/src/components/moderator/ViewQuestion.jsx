import { Box, Button, Card, CardActions, CardContent, FormControlLabel, Radio, RadioGroup, Typography, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {  useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModeratorMain from './ModeratorMain';
import ModeratorHeader from '../Header/ModeratorHeader';

const ViewQuestion = () => {
    
  const [quizData, setQuizData] = useState([]);
    const location = useLocation();
    const user = localStorage.getItem("email");
    const navigate = useNavigate();

    // recieve the id that passfrom the previouse page
    const { id } = location.state || { id: null };

    useEffect(() => {
        axios.get("http://localhost:4010/quiz")
            .then((res) => {
                console.log(res.data);
                const quiz = res.data.find((quizItem) => quizItem._id === id);
                if (quiz) {
                    setQuizData(quiz);
                  
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
    

    const handleNavigateToUpdate = () => {
      navigate("/updatequestion", { state: { id: quizData._id } });
    };
    
    
const deleteQuestian=(id)=>{
    axios.delete(`http://localhost:4010/questionDelete/${id}`)
    .then(()=>{
        alert("Deleted Successfully");
        navigate("/viewQuiz");
    })
    .catch((err)=>{
        alert("error");
    })
}
    


    return (
        <><div>
            <ModeratorMain/><ModeratorHeader></ModeratorHeader>
            </div><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                border='2px solid #ccc'
                padding='20px'
                bgcolor='#8fbc8f'
            >
                <div style={{ display: 'grid', gap: '20px', paddingBottom: '60px', padding: '20px' }}>
                    <Card>
                        <CardContent>
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
                                                label={option} />

                                        ))}
                                    </RadioGroup>
                                    <Typography variant='subtitle1'>CorrectAnswer :{question.correctAnswer}</Typography>
                                </div>
                            ))}
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleNavigateToUpdate}>Update</Button><br />
                            <Button onClick={() => { deleteQuestian(quizData._id); } }>Delete</Button>
                        </CardActions>
                    </Card>
                </div>
            </Box>

        </div></>
    );
}

export default ViewQuestion;
