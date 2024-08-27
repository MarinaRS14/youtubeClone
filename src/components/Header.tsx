import React from 'react';
import s from './Header.module.css';
import logo from '../assets/img/logo.svg';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type HeaderPropsType = {
  isToken: boolean;
  setIsToken: (isToken: boolean) => void;
};

function Header({ isToken, setIsToken }: HeaderPropsType) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const logOut = async () => {
    await localStorage.clear();
    await setIsToken(!isToken);
    navigate('/');
  };

  return (
    <header>
      <div className={s.header__menu}>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Logo" />
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className={s.header__button}>{t('header.search')}</div>
          </Link>
          <Link to="/favorites" style={{ textDecoration: 'none' }}>
            <div className={s.header__button}>{t('header.favorite')}</div>
          </Link>
        </div>
        <div>
          <div className={s.header__button} onClick={logOut}>
            {t('header.logout')}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
