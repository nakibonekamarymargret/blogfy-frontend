import React, { useEffect, useState, useRef } from "react";
import CommentService from "../../services/CommentService";
import { format } from "date-fns";
import { FaHeart, FaComment, FaEllipsisV } from "react-icons/fa";

const CommentSection = ({
  postId,
  currentUser,
  token,
  onCommentCountChange,
  onCommentAdded,
  onCommentDeleted,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const[commentCount, setCommentCount] = useState(0);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await CommentService.getCommentsByPost(postId);
        const approvedComments = res.data.filter(
          (c) => c.status === "APPROVED"
        );
        setComments(approvedComments);
        setCommentCount(approvedComments.length);
        if (onCommentCountChange) onCommentCountChange(approvedComments.length);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await CommentService.addComment(
        postId,
        { content: newComment, status: "APPROVED" },
        token
      );
      const updated = [...comments, res.data];
      setComments(updated);
      setNewComment("");
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await CommentService.deleteComment(id, token);
      const updated = comments.filter((c) => c.id !== id);
      setComments(updated);
      if (onCommentDeleted) onCommentDeleted(); // Call the re-fetch function
      setOpenDropdownId(null); // Close dropdown after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (id, updatedContent) => {
    try {
      const res = await CommentService.updateComment(
        id,
        { content: updatedContent },
        token
      );
      const updated = comments.map((c) => (c.id === id ? res.data : c));
      setComments(updated);
      if (onCommentCountChange) onCommentCountChange(updated.length);
      setOpenDropdownId(null); // Close dropdown after editing
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const toggleDropdown = (commentId) => {
    setOpenDropdownId(openDropdownId === commentId ? null : commentId);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="mt-6 pl-3">
      <h3 className=" text-lg font-semi-bold mb-2">
        Post Comments ({commentCount}){" "}
      </h3>

      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          cols={3}
          className="w-full border-2 border-gray-100 rounded p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-sm"
        />
        {newComment.trim() && (
          <button
            onClick={handleAddComment}
            className="mt-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition duration-300"
          >
            {" "}
            Comment{" "}
          </button>
        )}
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-row relative">
          <div className="border-2 rounded-md border-stone-100 m-4 px-4 py-2 shadow-md w-full">
            <div className="flex items-center">
              <img
                src={comment.user?.profilePicUrl || "/default-image.jpg"}
                alt={comment.user?.username || "User"}
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">
                  {comment.user?.username || "name not available"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {comment.createdAt
                    ? format(new Date(comment.createdAt), "dd MMM yyyy")
                    : "Date not available"}
                </p>
              </div>
            </div>
            <p className="text-gray-800">{comment.content}</p>

            <div className="flex items-center gap-4 mt-4 text-gray-600">
              <span className="flex items-center gap-1">
                <FaHeart /> {comment.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <FaComment /> {comment.replies?.length || 0}
              </span>
            </div>
          </div>
          <div className="relative m-4">
            <button
              onClick={() => toggleDropdown(comment.id)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaEllipsisV />
            </button>
            {openDropdownId === comment.id && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white z-10"
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu-button"
                >
                  {currentUser === comment.user?.username ? (
                    <>
                      <button
                        onClick={() => {
                          const updated = prompt(
                            "Edit comment:",
                            comment.content
                          );
                          if (updated?.trim())
                            handleEditComment(comment.id, updated);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        role="menuitem"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-red-700"
                        role="menuitem"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        // Implement your view detailed comment logic here, e.g., open a modal
                        alert(`Viewing detailed comment for ID: ${comment.id}`);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      role="menuitem"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
