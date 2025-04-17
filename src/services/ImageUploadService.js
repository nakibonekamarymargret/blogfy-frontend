import axios from "axios";

    const CLOUDINARY_URL=" https://api.cloudinary.com/v1_1/masowac/image/upload";
    const UPLOAD_PRESET ="blogfy_preset";

    const uploadImage=(file)=>{
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        return axios.post(CLOUDINARY_URL,formData);

} ;
    export  default {uploadImage};