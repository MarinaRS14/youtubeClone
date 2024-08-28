import React, { useEffect, useState } from 'react'
import s from './favorites.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { youtube } from '@/api/youtubeApi'
import { Modal } from '@/components'

export const Favorites = () => {
  const { t } = useTranslation()

  const [favorites, setFavorites] = useState([])
  const [modalActive, setModalActive] = useState(false)
  const [addedFavorite, setAddedFavorite] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const favoritesResponse = await axios.get(`${process.env.REACT_APP_API_URL}` + 'users')
      if (favoritesResponse.data.length !== 0) {
        const savedFavorites = favoritesResponse.data.filter(
          item => item.user == localStorage.getItem('login')
        )
        if (savedFavorites.length !== 0) {
          setFavorites(savedFavorites[0].info)
        }
      }
    }
    fetchData()
  }, [])

  const handleChange = favItem => {
    setModalActive(true)
    setAddedFavorite(favItem)
  }

  const navigate = useNavigate()

  const handleSearch = async (e, favItem) => {
    e.stopPropagation()
    const { data } = await youtube.get('/search', favItem.api)
    const request = favItem.request
    navigate('/', { state: { data, request } })
  }

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{t('favorite')}</h2>
      <div className={s.favorites}>
        {favorites.map((favItem, index) => (
          <div key={index} className={s.fav__list} onClick={() => handleChange(favItem)}>
            {favItem.title}
            <button className={s.button_hidden} onClick={e => handleSearch(e, favItem)}>
              {t('execute')}
            </button>
          </div>
        ))}
      </div>
      {addedFavorite ? (
        <Modal active={modalActive} setActive={setModalActive} {...addedFavorite} />
      ) : null}
    </div>
  )
}
