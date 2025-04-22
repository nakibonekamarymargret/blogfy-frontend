import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaComment } from "react-icons/fa";
import { format } from "date-fns";

function ViewPost() {
  const { id } = useParams(); // Correct way to extract id
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:7107/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
      }
    };
    fetchPost();
  }, [id]);
    if (!post) return <p>Loading...</p>;


  return (
    <div className="p-4 grid gap-6 grid-cols-12">
      <div className="aside col-span-2 shadow">
        <aside>
          <ul className="lists">
            <li>Home</li>
            <li>Home</li>
          </ul>
        </aside>
      </div>

      <div className="col-span-7">
        {post && (
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl cursor-pointer mb-6">
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
                <FaHeart /> {post.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <FaComment /> {post.comments?.length || 0}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-3 bg-slate-100 shadow text-white rounded p-4">
        <aside>
          <ul className="space-y-2">
            <li>💬 Discussions</li>
            <li>🔥 Trending</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default ViewPost;
