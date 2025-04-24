import axios from "axios";

const API_URL = "http://localhost:7107/posts";

class PostService {
  // get all posts
  getAllPosts() {
    return axios.get(`${API_URL}`);
  }
  // create post
  createPost(postData, token) {
    return axios.post(`${API_URL}/create`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  // update a post

  updatePost = (id, postData, token) =>
    axios.put(`${API_URL}/{id}/update`, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  deletePost = (id, token) =>
    axios.delete(`${API_URL}/{id}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  // Like or Unlike a Post
  addLikeUnlike(postId, token) {
    return axios.post(`${API_URL}/likeunlike/${postId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  // Get Number of Likes for a Post
  async getLikesCount(postId) {
    try {
      const response = await axios.get(`${API_URL}/likes/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching likes count:", error);
      throw error;
    }
  }
  // Remove Like/Unlike from a Post
  removeLike(postLikeId, token) {
    return axios.post(`${API_URL}/likeunlike/remove/${postLikeId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new PostService();
