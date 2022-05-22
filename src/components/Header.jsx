import React from 'react';
import s from './Header.module.css';
import logo from '../img/sibdev-logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header({ isToken, setIsToken, userInfo}) {
  const navigate = useNavigate();

  const logOut = async () => {
    await localStorage.clear();
    await setIsToken(!isToken);
    navigate('/');
  }
  return (
    <header>
        <div className={s.header__menu}>
            <div>
              <Link to='/' style={{textDecoration:"none"}}><img src={logo} alt="Logo" /></Link>
                <Link to='/' style={{textDecoration:"none"}}><div className={s.header__button}>Поиск</div></Link>
                <Link to='/favorites' style={{textDecoration:"none"}}><div className={s.header__button}>Избранное</div></Link>
            </div>
            <div>
              <div className={s.header__button} onClick={logOut}>Выйти</div>
            </div>
        </div>
    </header>
  )
}

export default Header