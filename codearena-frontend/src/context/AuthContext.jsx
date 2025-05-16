import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => Cookies.get('token') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            Cookies.set('token', token, { expires: 7 });
        } else {
            Cookies.remove('token');
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
