import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {register} from '../api/AuthApi.jsx';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registering...');

        try {
            await register({firstName, lastName, email, password}); // 👈 call API
            console.log('Registration successful');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setErrorMsg(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register on CodeArena</h2>

                {errorMsg && <p>{errorMsg}</p>}

                <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    required
                />

                <button type="submit">Register</button>

                <p>
                    Already have an account?{' '}
                    <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
}
