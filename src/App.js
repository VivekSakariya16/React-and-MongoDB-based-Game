import React from 'react';
import './App.css';
import Login from './Login';
import Home from './home'
import Game from './game'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Allrecord from './Allrecord';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/play' element={<Game />} />
        <Route path='/allrecord' element={<Allrecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
