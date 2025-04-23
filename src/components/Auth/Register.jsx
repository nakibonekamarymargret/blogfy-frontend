import React, { useState } from "react";
import AuthService from "../../services/AuthService.js";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.register({
        name,
        username,
        email,
        password,
      });
      console.log("Registration response:", response.data);

      // Check for the correct success message
      if (response.data.message === "You have successfully registered") {
        navigate("/posts"); // navigate to post page
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };
  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-black to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl bg-[#1a1a2e]">
        <div className="p-10 text-white">
          <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>
          {message && (
            <div className="text-center text-sm text-red-400 mb-4">
              {message}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex items-center bg-[#2c2c54] rounded px-3 py-2">
              <FaUser className="text-white mr-2" />
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent w-full outline-none text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-[#2c2c54] rounded px-3 py-2">
              <FaUser className="text-white mr-2" />
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent w-full outline-none text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-[#2c2c54] rounded px-3 py-2">
              <FaEnvelope className="text-white mr-2" />
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
              className="w-full bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-bold py-2 rounded shadow-md transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 to-pink-700 p-10 text-white">
          <h2 className="text-3xl font-bold mb-4 text-center">WELCOME!</h2>
          <p className="text-center text-sm">
            Join us by creating your account and start exploring today. <br />{" "}
            We’re glad to see you again!
          </p>
          <div className="text-center mt-4 text-gray-300">
            Already have an account?{" "}
            <button
              onClick={handleSwitchToLogin}
              className="text-white underline hover:text-white-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
