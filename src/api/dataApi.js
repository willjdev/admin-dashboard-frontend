import axios from 'axios';

const dataApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default dataApi;