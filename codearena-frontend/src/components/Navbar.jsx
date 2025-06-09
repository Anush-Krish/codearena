import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const tokenExists = document.cookie.split('; ').some(cookie => cookie.startsWith('token='));
        setIsLoggedIn(tokenExists);
    }, [location.pathname]); // Re-evaluate on route change

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/';
        setIsLoggedIn(false);
        navigate('/login');
    };

    // Check if we are on login or register page
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <nav className="flex items-center justify-between py-3 px-6 bg-gray-900 shadow-md">
            {/* Always show CodeArena branding */}
            <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-white">CodeArena</span>
                {!isAuthPage && (
                    <Link
                        to="/problems"
                        className="text-sm font-medium text-neutral-300 hover:text-white transition"
                    >
                        Problems
                    </Link>
                )}
            </div>

            {/* Show Logout only if not on login/register */}
            {!isAuthPage && (
                <div className="text-white text-sm">
                    {isLoggedIn && (
                        <button
                            onClick={handleLogout}
                            className="rounded-xl bg-red-600 px-4 py-1 font-semibold hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
