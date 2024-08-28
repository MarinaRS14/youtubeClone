import './App.scss'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Authorization, Favorites, Main, Player } from './pages'
import { Header } from './components/header/header'

function App() {
  const [isToken, setIsToken] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        {localStorage.getItem('token') ? (
          <>
            <Header isToken={isToken} setIsToken={setIsToken} />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/player" element={<Player />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Authorization isToken={isToken} setIsToken={setIsToken} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App
