import axios from "axios";

const API_URL = "http://localhost:7107/posts";

class PostService {

    getAllPosts(){
        return axios.post(`${API_URL}`)
    }
    createPost(postData, token) {
        return axios.post(`${API_URL}/create`, postData, {
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data",
            },
        });
    }

    updatePost = (id, postData, token) => axios.put(`${API_URL}/{id}/update`, postData, {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`
        }
    });
    deletePost = (id, token) => axios.delete(`${API_URL}/{id}/delete`, {
        headers: {Authorization: `Bearer ${token}`}
    });

}

export default new PostService();
