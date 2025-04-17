import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import AuthService from "../../services/AuthService.js";

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.register({ name, username, email, password });
            setMessage(response.data);
            if (response.data === 'User registered successfully') {
                navigate('/login');
            }
        } catch (error) {
            setMessage('Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                {message && <div className="text-center text-sm text-red-600 mb-4">{message}</div>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border rounded px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full border rounded px-3 py-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Register
                    </button>
                </form>
                <div className="text-center mt-4">
                    Already registered? <Link to="/login" className="text-blue-600 underline">Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
