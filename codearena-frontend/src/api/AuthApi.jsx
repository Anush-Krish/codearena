import axiosInstance from './axiosInstance.jsx';

export const login = async (email, password) => {
    const res = await axiosInstance.post('/auth/login', { email, password });
    return res.data.result;
};

export const register = async (userData) => {
    const res = await axiosInstance.post('/auth/register', userData);
    return res.data.result;
};
