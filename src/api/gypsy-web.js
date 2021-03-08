import axios from 'axios';

const instance = axios.create({
    // baseURL: `https://www.gypsy.developer.bdigismat.com`
    baseURL: `https://api.gypsycapital.com`
});


export default instance;