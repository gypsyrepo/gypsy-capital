import cloudinary from '../api/cloudinary-api';

export default () => {
    const handleUpload = async(file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'gypsyTest');

        try {
            const response = await cloudinary.post(`/`, data);
            // console.log(response);
            return response.data;
        } catch(err) {
            return err;
        }
    }

    return [ handleUpload ];
}