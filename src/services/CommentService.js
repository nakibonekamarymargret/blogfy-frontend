import axios from "axios";
const API_URL = "http://localhost:7107/comments";

class CommentService {
  getAllComments() {
    return axios.get(`${API_URL}`);
  }

  getCommentsByPost(postId) {
    return axios.get(`${API_URL}/post/${postId}`);
  }

  addComment(postId, comment, token) {
    return axios.post(`${API_URL}/post/${postId}`, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  deleteComment(id, token) {
    return axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateComment(id, updatedComment, token) {
    return axios.put(`${API_URL}/${id}`, updatedComment, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new CommentService();
