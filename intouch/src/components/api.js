import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/',
    timeout: 5000,
    headers: {}
});

export default api;