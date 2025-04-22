import axios from "axios";
const API_URL = "http://localhost:7107/comments";
class CommentService {
  // get all comments
  getAllComments() {
    return axios.get(`${API_URL}`);
  }
  // create comment
  createComment(commentData, token) {
    return axios.post(`${API_URL}/create`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateComment = (id, commentData, token) =>
    axios.put(`${API_URL}/{id}/update`, commentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  deleteComment = (id, token) =>
    axios.delete(`${API_URL}/{id}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  // getCommentsByPost
  getCommentsByPost = (postId) => {
    return axios.get(`${API_URL}/posts/${postId}`);
  };
  // add comment to post
  commentToPost=  (postId, comment, token) => {
    return axios.post(`${API_URL}/posts/${postId}/comment`, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}