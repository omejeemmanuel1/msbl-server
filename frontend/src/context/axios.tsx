import axios from 'axios';

const baseURL = 'http://localhost:3000';


const apiGet = (path: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    return axios.get(`${baseURL}${path}`, config);
}
    
export const apiPost = (path: string, data: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };
    return axios.post(`${baseURL}${path}`, data, config);
}