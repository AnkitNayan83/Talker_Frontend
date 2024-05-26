import axios from "axios";

const apiURL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: process.env.NEXT_VERCEL_PUBLIC_URL || apiURL,
});

export default api;
