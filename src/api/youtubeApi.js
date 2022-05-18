import axios from 'axios';
const KEY = process.env.REACT_APP_YT_KEY;
const BASE = process.env.REACT_APP_BASE_URL;


export const youtube = axios.create({
    baseURL: `${BASE}`,
    params: {
        part: 'snippet',
        key: KEY,
    }
})