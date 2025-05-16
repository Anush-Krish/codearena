import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { login } from '../api/AuthApi.jsx';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { token } = await login(email, password);
            setToken(token);
            navigate('/problems');
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Login failed');
            console.error('Login failed:', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login to CodeArena</h2>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Login</button>
                <p>Don’t have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    );
};

export default Login;
