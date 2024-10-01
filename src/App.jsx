import { useState } from 'react';
import { Route, Routes , useLocation } from 'react-router-dom';
import './App.css';
import Home from '../views/home';

const  App = () => {

  const location = useLocation();
  console.log(location.pathname);

  return (
     <>
       <Routes>
           <Route path="/"  element={<Home/>}/>
       </Routes>
     </>
  )
}

export default App
