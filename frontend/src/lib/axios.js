import axios from "axios";

export const axiosInstance=axios.create({
    baseURL: import.meta.env.Mode ==="development" ? "http://localhost:5003/api":"/api",
    withCredentials:true //to always send the cookie with request.

})