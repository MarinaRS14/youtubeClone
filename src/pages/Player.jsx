import React from 'react';
import Header from '../components/Header';
import s from './Player.module.css';
import Iframe from 'react-iframe';
import { useLocation } from 'react-router-dom';

function Player() {
  const location = useLocation();
  const id = `https://www.youtube.com/embed/${location.state}`;

  return (
    <div>
      <div className={s.player}>
        <Iframe url={id}
        width="800px"
        height="500px"
        id="myId"
        display="initial"
        position="relative"
        allowFullScreen
        />
      </div>
    </div>
    
  )
}

export default Player