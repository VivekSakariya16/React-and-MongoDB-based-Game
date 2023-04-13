import React from 'react';
import './App.css';
import Home from './home'
import Game from './game'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/play' element={<Game />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
