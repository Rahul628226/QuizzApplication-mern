import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import AdminHeader from '../Header/AdminHeader';
import Main from './Main';

const ViewAllQuiz = () => {
  const [dialogOpen, setOpenDialog] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState('');

  const [quizData, setQuizData] = useState([]);
  const [qdata, setQdata] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4010/quiz")
      .then((res) => {
        const quizdt = res.data.filter((quizItem) => quizItem.status === 'approved');
        setQuizData(quizdt);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOpen = (quizId) => {
    setSelectedQuizId(quizId);
    setOpenDialog(true);
    const selectedQuiz = quizData.find(quiz => quiz._id === quizId);
    setQdata(selectedQuiz);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  return (
    <>
    <AdminHeader/>
    <Main/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',paddingLeft:'200px' }}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          border='2px solid #ccc'
          padding='20px'
          bgcolor='#8fbc8f'
          minHeight='90vh'
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', paddingBottom: '60px', padding: '20px' }}>
            {quizData.map((val, i) => (
              <Card style={{minHeight:'20vh' ,width:'20vh'}} key={i}>
                <CardMedia>
                  <Typography variant='h6' style={{fontFamily:'cursive', fontWeight:'bold'}}>{val.topic}</Typography>
                </CardMedia>
                <CardContent>
                  <Button onClick={() => handleOpen(val._id)}>View</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>
        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogContent>
            {qdata && (
              <div style={{ gap: '20px', paddingBottom: '60px', paddingTop: '30px', padding: '20px' }}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' style={{ fontWeight: 'bold' }}>Quiz Created by: {qdata.userId}</Typography>
                    <Typography variant='h6'>{qdata.topic}</Typography>
                    <Typography variant='body1'>{qdata.sub}</Typography>
                  </CardContent>
                  <CardContent>
                    {qdata.questions.map((question, index) => (
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
                        <Typography variant='subtitle1'>CorrectAnswer: {question.correctAnswer}</Typography>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default ViewAllQuiz;
