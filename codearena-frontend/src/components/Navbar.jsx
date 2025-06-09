import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/';
        navigate('/login');
    };

    return (
        <nav className="flex items-center justify-between py-4 px-6 bg-gray-900 shadow-lg">
            {/* Left Side - Brand + Navigation */}
            <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-white">CodeArena</span>
                <Link
                    to="/problems"
                    className="text-sm font-medium text-neutral-300 hover:text-white transition"
                >
                    Problems
                </Link>
               
            </div>

            {/* Right Side - Logout Button */}
            <div>
                <button
                    onClick={handleLogout}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
