import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Problems from './pages/Problem.jsx';
import Solve from './pages/Solve.jsx';
import {AuthProvider} from "./context/AuthContext.jsx";

export default function App() {
    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/problems" element={<Problems/>}/>
                        <Route path="/solve/:id" element={<Solve/>}/>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}