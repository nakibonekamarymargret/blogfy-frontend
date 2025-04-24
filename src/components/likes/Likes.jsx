import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import PostService from "../../services/PostService";

const Likes = ({ postId, token }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const fetchLikes = async () => {
    try {
      const count = await PostService.getLikesCount(postId);
      setLikeCount(count);
    } catch (err) {
      console.error("Failed to fetch likes:", err);
    }
  };

  const toggleLike = async () => {
    try {
      if (!token) {
        alert("You need to be logged in to like posts!");
        return;
      }

      if (!isLiked) {
        await PostService.addLikeUnlike(postId, token);
        setLikeCount((prev) => prev + 1);
      } else {
        await PostService.removeLike(postId, token); // assumes postId = like ID
        setLikeCount((prev) => Math.max(0, prev - 1));
      }

      setIsLiked((prev) => !prev);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId]);

  return (
    <span
      onClick={toggleLike}
      className={` text-xl flex items-center gap-1 text-sm transition duration-200 cursor-pointer ${
        isLiked ? "text-red-500" : "text-gray-500"
      }`}
    >
      <FaHeart />
      {likeCount}
    </span>
  );

};

export default Likes;
