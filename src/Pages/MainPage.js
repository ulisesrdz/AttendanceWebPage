import '../../../client/src/App.css';
import NavBar from '../../../client/src/Components/NavBar';
import Students from '../Pages/Students';
import StudentsRegister from '../Pages/StudentsRegister';
import Course from '../Pages/Materias';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from "react";



function MainPage() {
    return (
        <>
        <Router>
          <NavBar />
          <Routes>
              <Route path='/Students' element={<Students/>} />
              <Route path='/StudentsRegister' element={<StudentsRegister/>} />
              <Route path='/Course' element={<Course/>} />
          </Routes>
        </Router>
        </>
        );
    }
    
    export default MainPage;
    