import React, {useState, useEffect} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import {login} from '../api/AuthApi.jsx';
import {getCookie} from "../utils/cookie.js";


const Login = () => {
    const {setToken} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);

    // Check token cookie
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setToken(token);
            navigate('/problems');
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { token } = await login(email, password);
            setToken(token);
            document.cookie = `token=${token}; path=/; max-age=86400`;

           
            window.location.href = '/problems';
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Login failed');
            console.error('Login failed:', err);
        }
    };


    if (loading) return null; // or a spinner if you want

    return (
        <div className="flex min-h-[70vh] items-start justify-center pt-36">

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-xl"
            >
                <h2 className="mb-6 text-center text-3xl font-bold text-white">Login</h2>

                {errorMsg && <p className="mb-4 text-sm text-red-400">{errorMsg}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-700 transition"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-sm text-gray-400">
                    Don’t have an account?{' '}
                    <a href="/register" className="text-cyan-400 hover:underline">Register</a>
                </p>
            </form>
        </div>
    );
};

export default {Login}