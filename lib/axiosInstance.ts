import axios from "axios";

const apiURL = process.env.BACKEND_URL || "http://localhost:8080/api";

const api = axios.create({
    baseURL: apiURL,
});

export default api;
