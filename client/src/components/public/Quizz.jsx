import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  AppBar
} from '@mui/material';
import Main12 from './Main12';

const Quizz = () => {

    const location = useLocation();

    //const {email} = location.state || {email:null};
  
    const userId = localStorage.getItem("email");
  
//     const HandleOpenMore=(id)=>{
//       navigate('/attemptquiz',{
//           state:{id:id,email:email},
//       }
      
//       );
  
//   }

    
  const [tags, setTags] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [score, setScore] = useState(0);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [notAttemptedCount, setNotAttemptedCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:4010/tags')
      .then(response => setTags(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4010/quiz")
      .then((res) => {
        const quiz = res.data.find((quizItem) => quizItem.status === 'approved' && quizItem.topic === selectedTag && quizItem.sub === currentModule.moduleName);
        if (quiz) {
          setQuizData(quiz);
          setQuizQuestions(quiz.questions);
          setUserAnswers(new Array(quiz.questions.length).fill(null));
        }
      })
      .catch((err) => console.log(err));
  }, [selectedTag]);
  

  const generateRandomColor = () => {
    const colors = ['#f2f1ed', '#f0eada', '#d4d2cd', '#b8b5ae', '#a3a2a0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const startTimer = () => {
    setTimerRunning(true);
    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerInterval);
      setTimerRunning(false);
    }, 600000); // 10 minutes
  };

  const handleOpenDialog = async (module) => {
    setOpenDialog(true);
    setCurrentModule(module);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentModule(null);
    setQuizQuestions([]);
    setTimeLeft(600);
    setTimerRunning(false);
    setShowQuestions(false);
    setUserAnswers(new Array(quizQuestions.length).fill(null));
  };

  const handleStartQuiz = () => {
    startTimer();
    setShowQuestions(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleAnswerSelection = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setUserAnswers(newAnswers);
  };

  const handleQuizSubmit = async () => {
    const calculatedScore = quizQuestions.reduce((totalScore, question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);

    const resultData = {
      username: userId, // Replace with actual username
      tagName: selectedTag,
      subTopic: currentModule.moduleName,
      totalScore: calculatedScore,
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      notAttemptedCount: notAttemptedCount
    };

    try {
      const response = await axios.post('http://localhost:4010/saveResult', resultData);
      console.log('Result data saved:', response.data);
    } catch (error) {
      console.error('Error saving result data:', error);
    }

    setScore(calculatedScore);
    setCorrectCount(
      quizQuestions.reduce((count, question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
          return count + 1;
        }
        return count;
      }, 0)
    );
    setIncorrectCount(
      quizQuestions.reduce((count, question, index) => {
        if (userAnswers[index] !== null && userAnswers[index] !== question.correctAnswer) {
          return count + 1;
        }
        return count;
      }, 0)
    );
    setNotAttemptedCount(
      quizQuestions.reduce((count, question, index) => {
        if (userAnswers[index] === null) {
          return count + 1;
        }
        return count;
      }, 0)
    );

    handleCloseDialog();
    setShowScoreDialog(true);
  };

  return (
    <div>
        <AppBar style={{backgroundColor:'#6dc2ed'}}>
            
        </AppBar>
      <Main12 />
    
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '300px' }}>
      <img src="https://media.tenor.com/9CMykSzGtY8AAAAC/take-quiz.gif" alt="Animated Icon" style={{ width: '200px', height: '100px' }} />
      
      <h1>{userId}</h1>
        {tags.map(tag => (
          <Card key={tag._id} sx={{ width: '1100px', marginBottom: '16px', backgroundColor: generateRandomColor() }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {tag.tagName}
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '8px' }}>
                {tag.modules.map(module => (
                  <Card key={module._id} sx={{ width: 'calc(25% - 16px)', margin: '4px', backgroundColor: '#FFFFFF' }}>
                    <CardContent>
                      <Typography variant="body2" component="div">
                        {module.moduleName}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setSelectedTag(tag.tagName);
                          handleOpenDialog(module);
                        }}
                        style={{ marginTop: '8px' }}
                      >
                        Attempt Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  aria-labelledby="quiz-dialog-title"
  maxWidth="md"
  fullWidth
  fullScreen
  PaperProps={{
    style: { backgroundColor: 'black', color: 'white', textAlign: 'center' },
  }}
>
        <DialogTitle id="quiz-dialog-title">Quiz for {currentModule && currentModule.moduleName}</DialogTitle>
        <DialogContent >
          {timerRunning ? (
            <Typography variant="h6">Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Typography>
          ) : (
            <Button variant="contained" color="primary" onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          )}

          {showQuestions && quizQuestions.length > 0 && (
            <CardContent style={{paddingLeft:'200px',paddingTop:'100px'}}>
              {quizQuestions.map((question, index) => (
                <div key={index} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}>
                  <Typography variant='subtitle1'>{`Question ${index + 1}: ${question.question}`}</Typography>
                  <RadioGroup value={userAnswers[currentQuestionIndex]} onChange={handleAnswerSelection}>
                    {question.options.map((option, optIndex) => (
                      <FormControlLabel
                        key={optIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </div>
              ))}
              <div>
                {currentQuestionIndex > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePreviousQuestion}
                  >
                    Previous
                  </Button>
                )}
                {currentQuestionIndex < quizQuestions.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleQuizSubmit}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </CardContent>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showScoreDialog} onClose={() => setShowScoreDialog(false)} aria-labelledby="score-dialog-title">
        <DialogTitle id="score-dialog-title">Quiz Score</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Your total score: {score}</Typography>
          <Typography variant="body1">
            Correct: {correctCount} 
          </Typography>
          <Typography variant="body1">
            Incorrect: {incorrectCount} 
          </Typography>
          <Typography variant="body1">
            Not Attempted: {notAttemptedCount} 
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowScoreDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Quizz;
