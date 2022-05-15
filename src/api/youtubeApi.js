import axios from 'axios';
const KEY = 'AIzaSyAmq2ewxGkd6XczDw69c-547iAH9Etw_i4';

export const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',

        key: KEY,
    }
})