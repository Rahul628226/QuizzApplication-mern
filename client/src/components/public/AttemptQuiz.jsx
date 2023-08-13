import { Box, Button, Card, CardActions, CardContent, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PublicHeader from '../Header/PublicHeader';
import './AttemptQuiz.css';

const AttemptQuiz = () => {
    const navigate = useNavigate(); //for navigation purpose
    const [quizData, setQuizData] = useState([]);
    const location = useLocation();
    const {id} = location.state || {id:null};
    const [score,setScore] = useState(0);
    const [selected, setselected] = useState();
    const [error, seterror] = useState(false);
    const [currques,setcurrques] = useState(0);
    const [correct,setcorrect] = useState();
    

    useEffect(() => {
        axios.get("http://localhost:4010/quiz")
            .then((res) => {
                console.log(res.data);
                setQuizData(res.data)
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

    const handleselect = (i) =>{
      
      if(selected===i  && selected===correct){
        return "select"
      }
      else if(selected===i && selected!==correct){
        return "wrong";
      }
      else if(i===correct){
        return "select";
      }
    };

    const handlecheck = (i) => {
      setselected(i);
      if ( i === correct) setScore(score +1);
      seterror(false);
    }

    const setcorrectanswer = (i) => {
      setcorrect(i);
    }
 const handleNext = () => {
  if (currques > 1){
    navigate('/result',{state:{score:score},});
  }
  else if(selected){
    setcurrques(currques + 1)
    setselected()
  }
  else {
    seterror('please select option now')
  }
 };
 


  return (
    <>
    <PublicHeader/>
    <div className='quiz'>
       <span className='subtitle'>Welcome</span>
       {quizData.map((value,i)=>{
        if(value._id === id){
          
        return (     
      <Box key={i}>
        <div className='quizinfo'>
             <span>Topic : {value.topic}   I</span>
             <span>Subject :{value.sub}    I</span>
             <span>Score : {score}         </span>     
       </div>
       <h1>Question {currques + 1}</h1>
       <div className='singlequestion'>
        <h2>{value.questions[currques].question}</h2>
       
        <div className={'options'}>
          {value.questions[currques].options.map((i)=> 
          <button onClick={() => handlecheck(i)}
           className={`singleoption ${selected && handleselect(i)}`}
           key={i}
           disabled={selected}
          >{i}</button>)}
        </div>
        <div className='controls'>
      
        <Button
         variant='contained'
         color='primary'
         size='large'
         style={{width:185}}
         onClick={handleNext}>NEXT QUESTION</Button>
      </div>
       </div>
       
     </Box>
    )
 } })}
 

    </div>
    </>
  )
}

export default AttemptQuiz