import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiX } from "react-icons/fi"; 
const PostToolbar = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave this page?"
    );
    if (confirmLeave) {
      navigate("/");
    }
  };

  return (
      <header className="bg-zinc-100 p-4 border-b border-gray-300 w-full flex items-center justify-between">
        <div className="flex items-center gap-4  space-x-4">
          <Link to="/">
            {" "}
            <span className=" text-xl font-bold text-indigo-600 hover:underline">
              BlogfyApp
            </span>
          </Link>
          <div className="actions">
            <span className="text-sm font-medium text-gray-600">
              Create Post
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-600 hover:text-indigo-500">
            Edit
          </button>
          <button className="text-gray-600 hover:text-gray-800">Preview</button>
        </div>
        <button
          className="text-red-500 hover:text-red-700 text-2xl"
          title="Leave Page"
          onClick={handleExit}
        >
          <FiX />
        </button>
      </header>

  );
};

export default PostToolbar;
