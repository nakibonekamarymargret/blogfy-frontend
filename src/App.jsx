import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreatePost from './components/blog/CreatePost.jsx';
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/new" element={<CreatePost />} />
  </Routes>
  )
}

export default App