import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaComment } from "react-icons/fa";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:7107/posts")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch posts");
                return res.json();
            })
            .then((data) => setPosts(data))
            .catch((err) => console.error("Error getting posts", err));
    }, []);

    const handlePostView = (id) => {
        navigate(`/posts/${id}`);
    };

    return (
        <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <p>Hi</p>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl cursor-pointer"
                    onClick={() => handlePostView(post.id)}
                >
                    <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                    <div className="flex items-center gap-4 mt-4 text-gray-600">
            <span className="flex items-center gap-1">
              <FaHeart /> 0
            </span>
                        <span className="flex items-center gap-1">
              <FaComment /> 0
            </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
