import axios from 'axios';
import resolveToken from '../utils/resolveToken';

export const gypsy = axios.create({
    baseURL: `https://gypsy-rouche.herokuapp.com`
});


const token = resolveToken();

export const gypsyWithToken = axios.create({
    baseURL: `https://gypsy-rouche.herokuapp.com`,
    headers: {
        'Authorization': `Bearer ${token}`
    }
});