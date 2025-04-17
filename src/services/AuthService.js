// const API_URL= "http://localhost:7107/auth";
//
// const register =async (userData)=>{
//     return fetch(`${API_URL}/register`,{
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify(userData),
//         }
//     );
//     if(!response.ok){
//         const  error = await response.text();
//         throw  new Error(error);
//     }
//     return response.text();
// };
// export default {register}
import axios from 'axios';

const API_BASE_URL = "http://localhost:7107/auth";

class AuthService {
    register(user) {
        return axios.post(`${API_BASE_URL}/register`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/login`, credentials);
    }
}

export default new AuthService();