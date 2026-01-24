import axios from "axios";

const API_KEY = "8487f9a3738beb45eed34a7aebae047c";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});
export default api;
