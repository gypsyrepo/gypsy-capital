import axios from 'axios';

let instance = axios.create({
    baseURL: `https://secure-basin-18118.herokuapp.com`
});

export default instance;