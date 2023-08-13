import { TextField, Typography, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateQuestian = () => {
  const location = useLocation();
  const { id = null } = location.state || {};

// navigate
const navigate = useNavigate();

const [qdata,setQuizData] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:4010/quiz")
            .then((res) => {
                console.log(res.data);
                const quiz = res.data.find((quizItem) => quizItem._id === id);
                if (quiz) {
                    setQuizData(quiz);
                   
                    setTopic(quiz.topic);
                    setSub(quiz.sub);
                    setDuration(quiz.duration);
                    setQuestions(quiz.questions);
                  
                }
            })
            .catch((err) => console.log(err));
    }
  ,[])

  const [topic, setTopic] = useState('');
  const [sub, setSub] = useState('');
  const [duration, setDuration] = useState('');

  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    if (name === 'question') {
      updatedQuestions[index].question = value;
    } else if (name.startsWith('option')) {
      const optionIndex = parseInt(name.slice(-1));
      updatedQuestions[index].options[optionIndex] = value;
    } else if (name === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const handleUpdate = (id) => {
    console.log("clicked update");
    console.log(id);

    const updateData = {
        topic,
        sub,
        duration,
        questions,
    };
    
     axios.put(`http://localhost:4010/quizupdate/${id}`,updateData)
            .then((res) => {
                console.log('Quiz Updated:', res.data);
                alert("updated Successfully");
                navigate('/viewquestion',{
                  state:{id:id},
                });
                
            })
            .catch((err) => {
                alert('error');
                console.log(err);

            });

  };

  return (
    <div>
      <Typography>{id}</Typography>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        bgcolor='#cfe8fc'
      >
        <Box
          width='80vh'
          border='2px solid #ccc'
          padding='20px'
          bgcolor='#f8f8ff'
        >
          <Typography variant='h4' fontWeight='600' align='center'>
            Update The Quiz
          </Typography>
          
          <Box>
            <label>Topic:</label>
            <TextField
              fullWidth
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Box>

          <Box>
            <label>Sub:</label>
            <TextField
              fullWidth
              value={sub}
              onChange={(e) => setSub(e.target.value)}
            />
          </Box>

          <Box>
            <label>Time Duration:</label>
            <TextField
              fullWidth
              type='number'
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Box>

          {questions.map((question, index) => (
            <Box key={index} mb={2}>
              <Typography variant='h6' fontWeight='600'>
                Question {index + 1}
              </Typography>
              <Box>
                <label>Question:</label>
                <TextField
                  type='text'
                  name='question'
                  fullWidth
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                />
              </Box>

              {question.options.map((option, optionIndex) => (
                <Box key={optionIndex}>
                  <label>Option {optionIndex + 1}:</label>
                  <TextField
                    type='text'
                    name={`option${optionIndex}`}
                    fullWidth
                    value={option}
                    onChange={(e) => handleQuestionChange(index, e)}
                  />
                </Box>
              ))}

              <Box>
                <label>Correct Answer:</label>
                <select
                  value={question.correctAnswer}
                  name='correctAnswer'
                  onChange={(e) => handleQuestionChange(index, e)}
                >
                  <option value=''>Select Correct Answer</option>
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Box>
            </Box>
          ))}

          <Box display='flex' justifyContent='space-between'>
            <Button onClick={handleAddQuestion}>Add Question</Button>
            <Button variant='contained' onClick={()=>{handleUpdate(id)}}>
              Submit Quiz
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default UpdateQuestian;
