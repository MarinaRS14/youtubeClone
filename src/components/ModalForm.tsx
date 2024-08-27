import React, { useEffect, useState } from 'react';
import s from './ModalForm.module.css';
import axios from 'axios';

function ModalForm({ 
    active, 
    setActive, 
    request, 
    readonly = false, 
    title = '',
    order = 'relevance',
    amount = '20'
}) {

    useEffect(() => {
        setRequestChange(request);
        setTitleChange(title);
        setRangeVal(amount);
        setSelectValue(order)
    }, [request,title,amount,order])

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
        request: requestChange,
        title: titleChange,
        order: selectValue,
        amount: rangeVal,
        api: {
            params: {
              q: requestChange,
              maxResults: rangeVal,
              order: selectValue,
            }
        }
    };

    const login = localStorage.getItem('login');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}`+'users');
    const data = response.data;

    if(readonly) {
        if(data.length == 0) {
            axios.post(`${process.env.REACT_APP_API_URL}`+'users', {
                user: login, 
                info: [ 
                    favorited
                ]
            });
        } 
        else {
            const user = data.filter(item => item.user == login);
            if(user.length !== 0) {
                await axios.delete(`${process.env.REACT_APP_API_URL}users/${user[0].id}`);
                await axios.post(`${process.env.REACT_APP_API_URL}`+'users', {
                    user: login, 
                    info: [
                        ...user[0].info, 
                        favorited
                    ]
                });
            } 
            else {
                await axios.post(`${process.env.REACT_APP_API_URL}`+'users', {
                    user: login, 
                    info: [
                        favorited
                    ]
                });
            }  
        }
        setActive(!active);
    } 
    else {
        const user = data.filter(item => item.user == login);
        const list = user[0].info.filter(item => item.request != request);
        await axios.delete(`${process.env.REACT_APP_API_URL}users/${user[0].id}`);
        await axios.post(`${process.env.REACT_APP_API_URL}`+'users', {
            user: login, 
            info: [
                ...list, 
                favorited
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
                        value={requestChange}
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


