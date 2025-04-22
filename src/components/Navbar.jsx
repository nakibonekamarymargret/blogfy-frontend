import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiBell } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:7107/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("User not logged in", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-stone-50 backdrop-blur-sm text-white px-6 py-3 flex justify-between items-center sticky top-0 z-50 w-full">
      <Link
        to="/"
        className="text-2xl font-bold italic tracking-widest text-fuchsia-400 hover:scale-105 transition-transform"
      >
        Blogfy
      </Link>

      <div className="flex items-center gap-6 text-black font-medium">
        {user ? (
          <>
            <Link to="/new" className="hover:text-fuchsia-300 font-sans">
              Create Post
            </Link>
            <Link
              to="/search"
              className="hover:text-fuchsia-300 flex items-center gap-1"
            >
              <FaSearch /> Search
            </Link>
            <Link to="/notifications" className="hover:text-fuchsia-300">
              <FiBell size={20} />
            </Link>

            <div className="relative group">
              <img
                src={user.profilePicUrl }
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform"
              />
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-black border rounded-md shadow-md w-44 z-50">
                <Link
                  to={`/profile/${user.id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-fuchsia-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-fuchsia-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
