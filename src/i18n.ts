import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        searchPlaceholder: 'What do you want to watch?',
        find: 'Find',
        videoOnRequest: 'Video on request',
        favorite: 'Favorites',
        execute: 'Execute',
        autorization: {
          requiredField: 'Fill in the field',
          enter: 'Log In',
          username: 'Username',
          password: 'Password',
        },
        header: {
          search: 'Search',
          favorite: 'Favorites',
          logout: 'Log Out',
        },
      },
    },
    ru: {
      translation: {
        searchPlaceholder: 'Что хотите посмотреть?',
        find: 'Найти',
        videoOnRequest: 'Видео по запросу',
        favorite: 'Избранное',
        execute: 'Выполнить',
        autorization: {
          requiredField: 'Заполните поле',
          enter: 'Вход',
          username: 'Имя пользователя',
          password: 'Пароль',
        },
        header: {
          search: 'Поиск',
          favorite: 'Избранное',
          logout: 'Выйти',
        },
      },
    },
  },
});
export default i18n;
