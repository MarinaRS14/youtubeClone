import React, { useEffect, useState } from 'react';
import s from './Favorites.module.css';
import axios from 'axios';
import ModalForm from '../components/ModalForm';
import { useNavigate } from 'react-router-dom';
import { youtube } from '../api/youtubeApi';


function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [addedFavorite, setAddedFavorite] = useState(null);

  
  useEffect(() => {
    async function fetchData() {
      const favoritesResponse = await axios.get(`${process.env.REACT_APP_API_URL}`+'users');
      if(favoritesResponse.data.length !== 0) {
        const savedFavorites = favoritesResponse.data.filter(item => item.user == localStorage.getItem('login'));
        if(savedFavorites.length !== 0) {
          setFavorites(savedFavorites[0].info);
        } 
      }
    }
    fetchData();
  }, []);

  const handleChange = (favItem) => {
    setModalActive(true);
    setAddedFavorite(favItem);
  }

  const navigate = useNavigate();

  const handleSearch = async (e, favItem) => {
    e.stopPropagation();
    const {data} = await youtube.get('/search', favItem.api);
    const request = favItem.request;
    navigate('/', {state: {data, request}} );
  }

  return (
    <div className={s.wrapper}>
        <h2 className={s.title}>Избранное</h2>
        <div className={s.favorites}>
          {favorites.map((favItem, index) =>
              <div 
                key={index} 
                className={s.fav__list}
                onClick={() => handleChange(favItem)}
              >
                {favItem.title}
                <button className={s.button_hidden} onClick={(e) => handleSearch(e, favItem)}>Выполнить</button>
              </div>
          )}
        </div>
        {
          addedFavorite ? 
        <ModalForm 
          active={modalActive} 
          setActive={setModalActive} 
          {...addedFavorite}
        />
        : null
        }
    </div>

  )
}

export default Favorites













