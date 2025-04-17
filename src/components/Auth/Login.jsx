import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from "../../services/AuthService.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login({ loginDetails: email, password });
            console.log("Login response:", response); // 👈 Add this

            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/new');
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            console.error("Login error:", error); // 👈 Add this
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                {message && <div className="text-center text-sm text-red-600 mb-4">{message}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
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
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    Not registered? <Link to="/register" className="text-blue-600 underline">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
