import axios from "axios";

//process.env.BACKEND_URL ||

const apiURL = process.env.BACKEND_URL || "http://localhost:8080/api";

const api = axios.create({
    baseURL: apiURL,
});

export default api;
