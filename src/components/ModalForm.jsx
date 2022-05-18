import React, { useState } from 'react';
import s from './ModalForm.module.css';
import axios from 'axios';

function ModalForm({ 
    userInfo,
    setUserInfo,
    active, 
    setActive, 
    request, 
    readonly = false, 
    id,
    title = '',
    order = 'relevance',
    amount = 20
}) {
    
  const [requestChange, setRequestChange] = useState(request);
  const [titleChange, setTitleChange] = useState(title);
  const [rangeVal, setRangeVal] = useState(amount);
  const [selectValue, setSelectValue] = useState(order);
  const handleChange = (e) => {
    setRangeVal(e.target.value)
  }

  const saveRequest = async (e) => {
    e.preventDefault();
    let favorited = {
        request: request,
        title: titleChange,
        order: selectValue,
        amount: rangeVal,
        api: {
            params: {
              q: request,
              maxResults: rangeVal,
              order: selectValue,
            }
        }
    };
    if(readonly) {
        // await axios.post('https://6278e5c96ac99a91065effff.mockapi.io/favorites', favorited);
        await axios.post('https://6278e5c96ac99a91065effff.mockapi.io/users', {
            user: `${localStorage.getItem('login')}`, 
            info: [
                ...`${userInfo.info}`, 
                favorited
            ]
        });
        await setActive(!active);
    } else {
        // await axios.delete(`https://6278e5c96ac99a91065effff.mockapi.io/favorites/${id}`);
        await axios.delete(`https://6278e5c96ac99a91065effff.mockapi.io/users/${userInfo.id}`);
        await axios.post('https://6278e5c96ac99a91065effff.mockapi.io/users', {
            user: `${localStorage.getItem('login')}`, 
            info: [
                ...`${userInfo.info}`, 
                {
                    request: requestChange, 
                    ...favorited
                }
                
            ]
        });
        setActive(!active);
    }
  }

  

  return (
    <div className={active ? `${s.container} ${s.active}` : `${s.container}`} onClick={() => setActive(false)}>
        <div className={s.modal__form} onClick={(e) => e.stopPropagation()}>
            <div className={s.form__title}>Сохранить запрос</div>
            <form onSubmit={saveRequest}>
                <div className={s.field}>
                    <label htmlFor="request">Запрос</label>
                    <input
                        id='request' 
                        type="text" 
                        value={readonly ? request : requestChange}
                        onChange={readonly ? null : (e) => setRequestChange(e.target.value)}
                        readOnly={readonly}
                    />
                </div>
                <div className={s.field}>
                    <label htmlFor="title"><span style={{color: 'red'}}>* </span>Название</label>
                    <input 
                        id='title' 
                        type="text" 
                        placeholder='Укажите название' 
                        value={titleChange}
                        onChange={(e) => setTitleChange(e.target.value)} 
                    />
                </div>
                <div className={s.field}>
                    <label htmlFor="title">Сортировать по</label>
                    <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                        {/* <option value="noOrder">Без сортировки</option> */}
                        <option value="relevance">По релевантности</option>
                        <option value="date">По дате загрузки</option>
                        <option value="rating">По рейтингу</option>
                        <option value="viewCount">По числу просмотров</option>
                    </select>
                </div>
                <div className={s.field}>
                    <label htmlFor="title">Максимальное количество</label>
                    <div className={s.range__container}>
                        <input 
                            id='title' 
                            type="range" 
                            min="1" 
                            max="50" 
                            value={rangeVal} onChange={handleChange}/>
                        <div className={s.button__range}>{rangeVal}</div>
                    </div>
                </div>
                <div className={s.buttons}>
                    <div className={s.button__clear} onClick={() => setActive(false)}>Не сохранять</div>
                    <button type='submit' className={s.button__blue}>Сохранить</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ModalForm;


