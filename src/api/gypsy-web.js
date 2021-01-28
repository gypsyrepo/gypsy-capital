import axios from 'axios';

let instance = axios.create({
    baseURL: `https://gypsy-rouche.herokuapp.com`
});

export default instance;