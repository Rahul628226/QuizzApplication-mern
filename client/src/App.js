import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Common/Home";
import AdminHeader from "./components/Header/AdminHeader";
import ModeratorHeader from "./components/Header/ModeratorHeader";
import PublicHeader from "./components/Header/PublicHeader";
import Heder from "./components/Common/Heder";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import AdminHome from "./components/admin/AdminHome";
import ModeratorHome from "./components/moderator/ModeratorHome";
import PublicHome from "./components/public/PublicHome";
import CreateQuiz from "./components/moderator/CreateQuiz";
import ViewQuiz from "./components/moderator/ViewQuiz";
import ViewQuestion from "./components/moderator/ViewQuestion";
import UpdateQuestian from "./components/moderator/UpdateQuestian";
import ViewAndApprove from "./components/admin/ViewAndApprove";
import ViewAllPending from "./components/admin/ViewAllPending";
import AttemptQuiz from "./components/public/AttemptQuiz";
import Result from "./components/public/Result";
import ProfileViewAndEdit from "./components/Profile/ProfileViewAndEdit";
import ViewAllQuiz from "./components/admin/ViewAllQuiz";
import ScoreBord from "./components/admin/ScoreBord";
import Profile from "./components/public/Profile";




const  App=()=> {

  // // const userRole = '';
  // const userRole = window.history.state?.userRole || '';
  

  // const getHeaderComponent = (userRole)=>{
  //   switch(userRole){
  //     case 'admin':
  //       return <AdminHeader/>;
  //     case 'moderator':
  //       return<ModeratorHeader/>;
  //     case 'public':
  //       return <PublicHeader/>;
  //     default:
  //       return <Heder/>
      
  //   }

  // };
  return (
    <Router>
      {/* {getHeaderComponent()} */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path ="/publicReg" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/adminhome" element={<AdminHome/>} />
        <Route path="/moderatorhome" element={<ModeratorHome/>} />
        <Route path="/publichome" element ={<PublicHome/>} />
        <Route path="/createQuiz" element={<CreateQuiz />} />
        <Route path="/viewQuiz" element={<ViewQuiz/>} />
        <Route path="/viewquestion" element={<ViewQuestion/>} />
        <Route path="/updatequestion" element={<UpdateQuestian/>} />
        <Route path="/viewallPending" element={<ViewAllPending/>} />
        <Route path="/viewAndApprove" element={<ViewAndApprove/>} />
        <Route path="/attemptquiz" element={<AttemptQuiz />} />
        <Route path='/result' element={<Result />} />

        <Route path="/profileViewAndEdit" element={<ProfileViewAndEdit/>} />
        <Route path="/ViewAllQuiz" element={<ViewAllQuiz/>} />
        <Route path="/scoreTable" element={<ScoreBord/>} />
        <Route path ="/profilepublic" element={<Profile/>} />
     
      </Routes>
      
        

      
    
    </Router>
    
  );
}

export default App;
