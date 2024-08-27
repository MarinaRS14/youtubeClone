import React, { useState } from 'react';
import s from './Autorization.module.css';
import logo from '../img/sibdev-logo.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const initialValues = {
  login: '',
  password: '',
};

function Autorization({ isToken, setIsToken }) {
  const { t } = useTranslation();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_AUTH}`, {
        email: values.login,
        password: values.password,
      });

      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem('login', values.login);
        localStorage.setItem('token', response.data.token);
        setIsToken(!isToken);
      } else if (response.status === 400) {
        alert("User doesn't exist. Try again ");
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = Yup.object({
    login: Yup.string().required(t('autorization.requiredField')),
    password: Yup.string().required(t('autorization.requiredField')),
  });

  return (
    <div className={s.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <div className={s.wrapper}>
          <img src={logo} alt="Logo" />
          <div className={s.enter}>{t('autorization.enter')}</div>
          <Form className={s.form}>
            <div className={s.form__field}>
              <label htmlFor="login">{t('autorization.username')}</label>
              <Field id="login" type="text" name="login" className={s.input} />
              <ErrorMessage name="login">
                {(errMsg) => <div className={`${s.error}`}>{errMsg}</div>}
              </ErrorMessage>
            </div>
            <div className={s.form__field}>
              <label htmlFor="password">{t('autorization.password')}</label>
              <Field id="password" type="password" name="password" className={s.input} />
              <ErrorMessage name="password">
                {(errMsg) => <div className={`${s.error}`}>{errMsg}</div>}
              </ErrorMessage>
            </div>
            <button type="submit" className={s.form__button}>
              {t('autorization.enter')}
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default Autorization;
