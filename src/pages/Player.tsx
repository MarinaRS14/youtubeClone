import React from 'react';
import s from './Player.module.css';
import Iframe from 'react-iframe';
import { useLocation } from 'react-router-dom';

function Player() {
  const location = useLocation();
  const id = `https://www.youtube.com/embed/${location.state}`;

  return (
    <div>
      <div className={s.player}>
        <Iframe url={id} width="80%" height="80%" id="myId" position="relative" allowFullScreen />
      </div>
    </div>
  );
}

export default Player;
