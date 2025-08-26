import axios from 'axios';

const APP_AUTH_URL = import.meta.env.VITE_APP_AUTH_URL;


//Register user
const register = async (userData) => {
    const res = await axios.post(`${APP_AUTH_URL}register`, userData);
    return res.data;
};

//Login user
const login = async (credentials) => {
    const res = await axios.post(`${APP_AUTH_URL}login`, credentials);
    return res.data;
};

export { register, login };