import React from 'react'
import s from './player.module.scss'
import Iframe from 'react-iframe'
import { useLocation } from 'react-router-dom'

export const Player = () => {
  const location = useLocation()
  const id = `https://www.youtube.com/embed/${location.state}`

  return (
    <div>
      <div className={s.player}>
        <Iframe url={id} width="80%" height="80%" id="myId" position="relative" allowFullScreen />
      </div>
    </div>
  )
}
