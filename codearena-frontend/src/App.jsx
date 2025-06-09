import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Problems from './pages/Problems';
import Solve from './pages/Solve';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/register'];

    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <div className="container mx-auto">
            {!shouldHideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Navigate to="/problems" replace />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/solve/:id" element={<Solve />} />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}
