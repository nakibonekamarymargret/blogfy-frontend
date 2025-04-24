import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaComment } from "react-icons/fa";
import { format } from "date-fns";
import CommentSection from "../comments/CommentSection";
import { RiHeartAdd2Line } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa6";
import Likes from "../likes/Likes";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [popularPosts, setPopularPosts] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const token = localStorage.getItem("token");

  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:7107/posts/${id}`);
      const postData = res.data;
      setPost(postData);
      setCommentCount(
        postData.comments?.filter((c) => c.status === "APPROVED").length || 0
      );
      setLikesCount(postData.likes || 0); // Set likes count
      // Fetch author data
      setAuthor(postData.author); // Set author data

      const postsRes = await axios.get(
        `http://localhost:7107/posts/authors/${postData.author.id}/posts`
      );
      const sorted = postsRes.data
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 3);
      setPopularPosts(sorted);
    } catch (err) {
      console.error("Failed to fetch post or author data:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);


  return (
    <div className="p-4 m-8 grid gap-6 grid-cols-12">
      {/* Main post content */}
      <div className="col-span-2">
        <div className="lists">
          <ul className="icons">
            <li className="mb-4">
              <RiHeartAdd2Line />
            </li>
            <li className="mb-4">
              <FaRegComment />
              {commentCount}
            </li>
            <li className="mb-4">
              <IoBookmarkOutline />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-7 card bg-slate-100 shadow-md rounded p-7 text-gray-800">
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl cursor-pointer mb-6">
          <div className="flex ">
            <img
              src={author.profilePicUrl || "/profileImage.png"}
              alt={author.username || "author"}
              className="w-12 h-24 rounded-full object-cover mr-4"
            />
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">
                {author.email || "Email not available"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {post.publishedAt
                  ? format(new Date(post.publishedAt), "dd MMM yyyy")
                  : "Date not available"}
              </p>
            </div>
          </div>

          <h2 className=" uppercase mb-3 mt-2  text-3xl font-semibold text-gray-800">
            {post.title}
          </h2>
          <div className="h-60">
            <img
              src={post.coverImageUrl || "/default-image.jpg"}
              alt={post.title || "Post image"}
              className="w-full h-full object-cover mb-4"
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {post.publishedAt
              ? format(new Date(post.publishedAt), "dd MMM yyyy")
              : "Date not available"}
          </p>
          <div className="flex items-center gap-4 mt-4 text-gray-600">
            <span className="flex items-center gap-1">
              <Likes postId={id} token={token} />
              {""}
            </span>
            <span className="text-xl flex items-center gap-1">
              <FaComment /> {commentCount}
            </span>
          </div>
          <p className="text-gray-800 mt-4 px-8 leading-10">{post.content}</p>
          <div className="comment-section">
            {/* Comment Section */}
            {post.id && (
              <CommentSection
                postId={post.id}
                token={token}
                onCommentAdded={fetchPost}
                onCommentDeleted={fetchPost}
                onCommentCountChange={setCommentCount}
                currentUser={undefined}
              />
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-3 bg-slate-100 shadow rounded p-3 text-gray-800 card">
        <aside>
          <div className="text-center mb-6">
            <img
              src={author.profilePicUrl || "/default-avatar.png"}
              alt={author.username || "author"}
              className="w-24 h-30 mx-auto rounded-full object-cover mb-2"
            />
            <h3 className="text-lg font-bold">
              {author.name || author.authorname}
            </h3>
            <p className="text-sm text-gray-500">{author.email}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">🔥 Popular Posts</h4>
            <ul className="text-sm space-y-2">
              {popularPosts.map((p) => (
                <li key={p.id} className="bg-white rounded p-2 shadow">
                  <p className="font-medium truncate">{p.title}</p>
                  <div className="flex text-gray-500 text-xs gap-3 mt-1">
                    <span>
                      <FaHeart className="inline" /> {p.likes}
                    </span>
                    <span>
                      <FaComment className="inline" /> {p.comments?.length || 0}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ViewPost;
