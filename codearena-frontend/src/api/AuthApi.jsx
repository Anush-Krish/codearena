import axios from 'axios'; // Not axiosInstance

const API_BASE = 'https://anushkrish.xyz/api';

export const login = async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return res.data.result;
};

export const register = async (userData) => {
    const res = await axios.post(`${API_BASE}/auth/register`, userData);
    return res.data;
};