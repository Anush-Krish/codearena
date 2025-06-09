import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/AuthApi.jsx';
import { getCookie } from '../utils/cookie.js';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie('token');
        if (token) navigate('/problems');
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register({ firstName, lastName, email, password });
            navigate('/login');
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-xl"
            >
                <h2 className="mb-6 text-center text-3xl font-bold text-white">Join CodeArena</h2>

                {errorMsg && (
                    <p className="mb-4 rounded-md bg-red-600 px-4 py-2 text-sm text-white">
                        {errorMsg}
                    </p>
                )}

                <div className="space-y-4">
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                    />
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white transition hover:bg-cyan-600"
                >
                    Register
                </button>

                <p className="mt-4 text-center text-sm text-gray-300">
                    Already have an account?{' '}
                    <a href="/login" className="text-cyan-400 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
