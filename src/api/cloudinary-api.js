import axios from 'axios';

const instance = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/pureverb/image/upload`
})


export default instance;