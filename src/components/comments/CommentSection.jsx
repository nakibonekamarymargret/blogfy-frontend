import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7107/comments/post/${postId}`
        );
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [postId]);

  // Add comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:7107/comments/post/${postId}`,
        {
          content: newComment,
          status: "APPROVED", 
        }
      );

      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">Comments</h3>

      {comments.length === 0 && (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}

      {comments.map((comment) => (
        <div key={comment.id} className="border-b py-2">
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border rounded p-2"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
