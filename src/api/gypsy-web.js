import axios from 'axios';

const instance = axios.create({
    baseURL: `https://www.gypsy.developer.bdigismat.com`
});


export default instance;