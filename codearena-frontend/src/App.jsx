import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Register from './pages/Register.jsx';
import auth from './pages/Login.jsx';
import Problems from './pages/Problem.jsx';
import Solve from './pages/Solve.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";
import NavBar from "./components/Navbar.jsx";

function AppRoutes() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideNavbar && <NavBar />}
            <Routes>
                <Route path="/" element={<Navigate to="/problems" replace />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<auth.Login />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/solve/:id" element={<Solve />} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 ">
            <div className="fixed top-0 -z-10 h-full w-full">
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-50 bg-gradient-to-r from-black via-black to-gray-800"></div>
            </div>
            <div className="container mx-auto ">
                <AuthProvider>
                    <Router>
                        <AppRoutes />
                    </Router>
                </AuthProvider>
            </div>
        </div>
    );
}
