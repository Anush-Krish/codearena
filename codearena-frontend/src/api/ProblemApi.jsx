import axiosInstance from './axiosInstance.jsx';

export const getProblems = async () => {
    const res = await axiosInstance.get('/problems');
    return res.data;
};

export const submitSolution = async ({ problemId, code, language }) => {
    const res = await axiosInstance.post('/submit', {
        problemId,
        code,
        language,
    });
    return res.data;
};
