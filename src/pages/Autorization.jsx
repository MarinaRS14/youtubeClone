import React, { useState } from 'react';
import s from './Autorization.module.css';
import logo from '../img/sibdev-logo.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const initialValues = {
    login: '',
    password: ''
};

function Autorization({ isToken, setIsToken, userInfo, setUserInfo }) {


    const onSubmit = async (values) => {
        try {
            const response = await axios.post('https://typ-back-end.herokuapp.com/api/login', {
                login: values.login,
                password: values.password
            })
            if(response.data.isAuth) {
                localStorage.setItem('login', values.login)
                localStorage.setItem('token', response.data.token)
                setIsToken(!isToken);

            const userData = await axios.get('https://6278e5c96ac99a91065effff.mockapi.io/users');
            // console.log(userData.data)
            const user = await userData.data.filter(item => item.user == values.login);
            if(user.length !== 0) {
                setUserInfo(user[0]);
            }
            
            } else if(!response.data.isAuth) {
                alert('Такой пользователь не существует. Попробуйте еще раз')
                console.log(response)
            }
        }
        catch(e) {
            console.log(e)
        }    
    }
    

const validationSchema = Yup.object({
    login: Yup.string().required('Заполните поле'),
    password: Yup.string().required('Заполните поле')
});

  return ( 
    <div className={s.container}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <div className={s.wrapper}>
            <img src={logo} alt="Logo" />
            <div className={s.enter}>Вход</div>
            <Form className={s.form}>
                <div className={s.form__field}>
                    <label htmlFor="login">Логин</label>
                    <Field 
                        id='login' 
                        type="text"
                        name='login'
                        className={s.input}
                    />
                    <ErrorMessage name='login'>
                        {
                            (errMsg) => <div className={`${s.error}`}>{errMsg}</div>
                        }
                    </ErrorMessage>
                </div>
                <div className={s.form__field}>
                    <label htmlFor="password">Пароль</label>
                    <Field 
                        id='password' 
                        type="password"
                        name='password'
                        className={s.input}
                    />
                    <ErrorMessage name='password'>
                        {
                            (errMsg) => <div className={`${s.error}`}>{errMsg}</div>
                        }
                    </ErrorMessage>
                </div>
                <button type='submit' className={s.form__button}>Войти</button>
            </Form>
        </div>
        </Formik>
    </div>
    
  )
}

export default Autorization