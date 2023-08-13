import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminHeader from '../Header/AdminHeader';
import Main from './Main';

const ScoreBord = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      const [result, setResult] = useState([]);
      
      useEffect(() => {
        axios.get("http://localhost:4010/getResults")
        .then((res) => {
            setResult(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
      }, []);
      
      // Create a new array with merged quiz details for the same username
      const mergedResults = result.reduce((acc, val) => {
        const existingItem = acc.find(item => item.username === val.username);
        if (existingItem) {
            existingItem.quizDetails.push({
                tagName: val.tagName,
                subTopic: val.subTopic,
                totalScore: val.totalScore,
                correctCount: val.correctCount,
                incorrectCount: val.incorrectCount,
                notAttemptedCount: val.notAttemptedCount,
            });
        } else {
            acc.push({
                username: val.username,
                quizDetails: [{
                    tagName: val.tagName,
                    subTopic: val.subTopic,
                    totalScore: val.totalScore,
                    correctCount: val.correctCount,
                    incorrectCount: val.incorrectCount,
                    notAttemptedCount: val.notAttemptedCount,
                }],
            });
        }
        return acc;
    }, []);

    return (
        <>
        <AdminHeader/>
        <Main/>
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Topic</StyledTableCell>
                            <StyledTableCell>Sub</StyledTableCell>
                            <StyledTableCell>Total Score</StyledTableCell>
                            <StyledTableCell>Correct Answer</StyledTableCell>
                            <StyledTableCell>Wrong Answer</StyledTableCell>
                            <StyledTableCell>Attempted Count</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mergedResults.map((val, i) => (
                            <React.Fragment key={i}>
                                <StyledTableRow>
                                    <StyledTableCell>{val.username}</StyledTableCell>
                                    <StyledTableCell colSpan={6} />
                                </StyledTableRow>
                                {val.quizDetails.map((quiz, idx) => (
                                    <StyledTableRow key={idx}>
                                        <StyledTableCell />
                                        <StyledTableCell>{quiz.tagName}</StyledTableCell>
                                        <StyledTableCell>{quiz.subTopic}</StyledTableCell>
                                        <StyledTableCell>{quiz.totalScore}</StyledTableCell>
                                        <StyledTableCell>{quiz.correctCount}</StyledTableCell>
                                        <StyledTableCell>{quiz.incorrectCount}</StyledTableCell>
                                        <StyledTableCell>{quiz.notAttemptedCount}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </>
        
    );
}

export default ScoreBord;
