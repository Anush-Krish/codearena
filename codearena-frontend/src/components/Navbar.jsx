import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const tokenExists = document.cookie.split('; ').some(cookie => cookie.startsWith('token='));
        setIsLoggedIn(tokenExists);
    }, []);

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/';
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="flex items-center justify-between py-3 px-6 bg-gray-900 shadow-md">
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-3xl font-bold text-white">CodeArena</Link>
            </div>
            <div className="flex items-center gap-4 text-white text-sm">
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="rounded-xl bg-red-600 px-4 py-1 font-semibold hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="rounded-xl bg-cyan-600 px-4 py-1 font-semibold hover:bg-cyan-700 transition"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
