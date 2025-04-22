import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import React from "react";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`/api/comments/post/${postId}`)
      .then((res) => setComments(res.data));
  }, [postId]);

  const handleSubmit = () => {
    axios.post(`/comments/post/${postId}`, { content }).then((res) => {
      setComments((prev) => [...prev, res.data]);
      setContent("");
    });
  };

 const handleLike = async (commentId) => {
   const userId = 1;    try {
     const res = await axios.post(
       `/api/likes/comment/${commentId}/user/${userId}`
     );

     // Refresh comments after liking
     const updatedComments = await axios.get(`/api/comments/post/${postId}`);
     setComments(updatedComments.data);
   } catch (err) {
     // If already liked, maybe unlike
     if (err.response && err.response.status === 400) {
       await axios.delete(`/api/likes/comment/${commentId}/user/${userId}`);
       const updatedComments = await axios.get(`/api/comments/post/${postId}`);
       setComments(updatedComments.data);
     }
   }
 };


  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {/* Comment Form */}
      <div className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Comment
        </button>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <p className="font-semibold">
                  {comment.user?.username || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-800">{comment.content}</p>

            {/* Likes Section */}
            <div className="flex items-center mt-3 text-sm text-gray-600">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center space-x-1 hover:text-red-600 transition"
              >
                <FaHeart />
                <span>{comment.likes?.length || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
