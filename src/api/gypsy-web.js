import axios from 'axios';

let instance = axios.create({
    baseURL: `https://www.gypsy.developer.bdigismat.com/`
});

export default instance;