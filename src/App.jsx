import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Autorization from './pages/Autorization';
import Main from './pages/Main';
import Player from './pages/Player';
import Favorites from './pages/Favorites';
import Header from './components/Header';




function App() {
  const [isToken, setIsToken] = useState(false);

  return (
    <div className="App">  
      <BrowserRouter>
        
          {
            localStorage.getItem('token') ? 
          <>
          <Header isToken={isToken} setIsToken={setIsToken}/>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/player' element={<Player />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
          </>
          :
          <Routes>
            <Route path='/' element={<Autorization isToken={isToken} setIsToken={setIsToken}/>} />
          </Routes>
          } 
      </BrowserRouter>
    </div>
  );
}

export default App;
