import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService.js";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(""); // new state to hold user's name
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login({
        loginDetails: email,
        password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        const name = response.data.user?.name || "User"; // fallback in case name is missing
        setUsername(name);
        navigate("/posts");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage("Invalid credentials", error);
    }
  };

  const handleSwitchToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl bg-[#1a1a2e]">
        {/* Left Side - Welcome Message */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 to-pink-700 p-10 text-white">
          <h2 className="text-3xl font-bold mb-4 text-center">
            HELLO {"👋"} {username || "WELCOME BACK"}
          </h2>
          <p className="text-lg text-center">
            Please login to your account to continue. If you don't have an
            account, feel free to sign up.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="p-10 text-white">
          <h2 className="text-4xl font-bold text-center mb-6">Login</h2>
          {message && (
            <div className="text-center text-sm text-red-400 mb-4">
              {message}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex items-center bg-[#2c2c54] rounded px-3 py-2">
              <FaUser className="text-white mr-2" />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent w-full outline-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-[#2c2c54] rounded px-3 py-2">
              <FaLock className="text-white mr-2" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent w-full outline-none text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
            >
              Login
            </button>
            <div className="text-center mt-4">
              Don’t have an account?{" "}
              <button
                onClick={handleSwitchToRegister}
                className="text-purple-400 underline hover:text-purple-200"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-purple-400 underline hover:text-purple-200"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
