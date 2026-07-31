import axios from "axios";

const API = axios.create({
  baseURL: "https://campusflow-yubf.onrender.com",
});

export default API;