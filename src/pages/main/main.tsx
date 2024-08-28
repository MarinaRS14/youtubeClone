import React, { FormEvent, useState } from 'react'
import s from './main.module.scss'
import gridAct from '../../assets/img/table-active.svg'
import grid from '../../assets/img/table.svg'
import listAct from '../../assets/img/list-active.svg'
import list from '../../assets/img/list.svg'
import unlikedHeart from '../../assets/img/outlined-heart.svg'
import likedHeart from '../../assets/img/filled-heart.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { youtube } from '@/api/youtubeApi'
import { Modal } from '@/components'

type ResponseType = {
  totalResults: number
  items: Array<any>
  request: string
}

export const Main = () => {
  const { t } = useTranslation()

  // const location = useLocation();
  const navigate = useNavigate()

  const [request, setRequest] = useState('')
  const [result, setResult] = useState<ResponseType | null>(null)
  const [modalActive, setModalActive] = useState(false)
  const [gridActive, setGridActive] = useState(true)
  const [listActive, setListActive] = useState(false)
  // const [locationState, setLocationState] = useState(location.state);

  // useEffect(() => {
  //   if (location.state) {
  //     setRequest(location.state.request);
  //     setResult({ ...location.state.data, request });
  //   }
  // }, []);

  const onSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (request) {
      const response = await youtube.get('/search', {
        params: {
          q: request,
          maxResults: 12,
        },
      })
      setResult({
        totalResults: response.data.pageInfo.totalResults,
        items: response.data.items,
        request,
      })
    }
  }

  const handleClickGrid = () => {
    setGridActive(!gridActive)
    setListActive(!!gridActive)
  }
  const handleClickList = () => {
    setListActive(!listActive)
    setGridActive(!!listActive)
  }

  const openVideo = id => {
    navigate('/player', { state: id })
  }

  return (
    <div>
      <div className={result ? `${s.wrapper} ${s.wrapper__top}` : `${s.wrapper}`}>
        <p>Video Search</p>
        <form className={s.search} onSubmit={onSearch}>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={request}
            onChange={e => setRequest(e.target.value)}
          />
          <div className={s.block__button}>
            {request ? (
              <div className={s.unliked__block}>
                <img
                  src={modalActive ? likedHeart : unlikedHeart}
                  alt="unliked"
                  className={s.unliked}
                  onClick={() => setModalActive(true)}
                />
              </div>
            ) : null}
            <button type="submit">{t('find')}</button>
          </div>
        </form>

        {result ? (
          <div className={s.container_card}>
            <div className={s.result__info}>
              <ul className={s.info__left}>
                <li>{t('videoOnRequest')}</li>
                <li className={s.bold}>&#171;{request.toLowerCase()}&#187;</li>
                <li className={s.amount}>{result.totalResults}</li>
              </ul>
              <div className={s.info__right}>
                <img src={gridActive ? gridAct : grid} alt="grid" onClick={handleClickGrid} />
                <img src={listActive ? listAct : list} alt="list" onClick={handleClickList} />
              </div>
            </div>
            {gridActive ? (
              <div className={s.content__grid}>
                {result.items.map((item, index) => {
                  const link = item.id.videoId
                  return (
                    <div key={index} className={s.card}>
                      <img
                        src={item.snippet.thumbnails.medium.url}
                        alt="imgGrid"
                        onClick={() => openVideo(link)}
                      />
                      <h3 className={s.title}>
                        {item.snippet.title.length >= 63
                          ? `${item.snippet.title.substring(0, 63)}...`
                          : item.snippet.title}
                      </h3>
                      <h3 className={s.channel}>{item.snippet.channelTitle}</h3>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className={s.content__list}>
                {result.items.map((item, index) => (
                  <div key={index} className={s.list}>
                    <img
                      src={item.snippet.thumbnails.medium.url}
                      alt="imgList"
                      onClick={() => openVideo(item.id.videoId)}
                    />
                    <div className={s.list__block}>
                      <h3 className={s.title}>
                        {item.snippet.title.length >= 63
                          ? `${item.snippet.title.substring(0, 63)}...`
                          : item.snippet.title}
                      </h3>
                      <h3 className={s.channel}>{item.snippet.channelTitle}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
      {request ? (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          request={request}
          setRequest={setRequest}
          readonly={true}
        />
      ) : null}
    </div>
  )
}
