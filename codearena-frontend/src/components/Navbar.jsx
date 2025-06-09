import React from 'react';
import {useNavigate} from 'react-router-dom';
import auth from '../pages/Login.jsx'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/';

        navigate('/login');
    };


    return (
        <nav className="flex items-center justify-between py-3 px-6 bg-gray-900">
            <div className="flex flex-shrink-0 items-center">
                <span className="mx-1 text-3xl font-bold text-white">CodeArena</span>
            </div>
            <div className="flex items-center gap-4 text-2xl text-white">
                <button
                    onClick={handleLogout}
                    className="rounded-xl bg-red-600 px-4 py-1 text-sm font-semibold hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
