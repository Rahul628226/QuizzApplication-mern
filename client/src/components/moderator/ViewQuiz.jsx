import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModeratorHeader from '../Header/ModeratorHeader';
import ModeratorMain from './ModeratorMain';

const ViewQuiz = () => {
    // fetch user
    const user = localStorage.getItem("email");


    const [quizData, setQuizData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4010/quiz")
        .then((res) => {
            const moderatorData = res.data.filter((quiz)=>quiz.userId === user)
            console.log(res.data);
            setQuizData(moderatorData);
        })
        .catch((err) => console.log(err));
    }, []);

    const fullViewNavigate=(id)=>{
        navigate('/viewquestion',{
            state:{id:id},
        });


    }

    return (
       <>
       <ModeratorMain></ModeratorMain>
        <ModeratorHeader/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                border='2px solid #ccc'
                padding='20px'
                bgcolor='#8fbc8f'
            >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', paddingBottom: '60px',  padding: '20px' }}>
                    {quizData.map((val, i) => (
                        <Card key={i}>
                            <CardMedia>
                                <Typography variant='h6'>{val.topic}</Typography>
                            </CardMedia>
                            <CardContent>
                                <Button onClick={() => fullViewNavigate(val._id)}>View</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Box>
        </div>
       </>
    );
}

export default ViewQuiz;
