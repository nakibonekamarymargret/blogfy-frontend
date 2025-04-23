import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaComment } from "react-icons/fa";
import { format } from "date-fns";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:7107/posts`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      console.log(data);

      setPosts((prev) => {
        const combined = [...prev, ...data];
        const uniquePosts = Array.from(
            new Map(combined.map((p) => [p.id, p])).values()
        );
        return uniquePosts;
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }, []); // Removed `posts` here

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


 
  const handlePostView = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="px-4 grid gap-6 grid-cols-12 mx-3">
      <div className="col-span-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl cursor-pointer mb-6"
            onClick={() => handlePostView(post.id)}
          >
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {post.publishedAt
                ? format(new Date(post.publishedAt), "dd MMM yyyy")
                : "Date not available"}
            </p>
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

      <div className="col-span-4 shadow text-white rounded p-4">
        <aside>
          <div className="popular_posts">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Popular Posts
            </h2>
            <ul className="space-y-2">
              {posts.slice(0, 5).map((post) => (
                <li
                  key={`popular-${post.id}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3
                      className="text-2xl font-semibold text-purple-950 font-serif hover:text-fuchsia-300 cursor-pointer"
                      onClick={() => handlePostView(post.id)}
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs text-red-950">
                      {format(new Date(post.publishedAt), "dd MMM yyyy")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="quick_polls mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🗳️ Quick Poll
            </h3>
            <p className="text-gray-700 mb-1">
              What's your favorite frontend framework?
            </p>
            <ul className="space-y-1 text-gray-600">
              <li>
                <input type="radio" name="poll" /> React
              </li>
              <li>
                <input type="radio" name="poll" /> Vue
              </li>
              <li>
                <input type="radio" name="poll" /> Angular
              </li>
              <li>
                <input type="radio" name="poll" /> Svelte
              </li>
            </ul>
          </div>

          <div className="user_tips mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              💡 Dev Tip of the Day
            </h3>
            <p className="text-gray-700 text-sm">
              Use `useEffect()` with cleanup to prevent memory leaks in React
              components!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Posts;
