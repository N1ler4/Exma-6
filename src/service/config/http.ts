import axios from "axios";
import { getDataFromCookie, saveDataFromCookie } from "@token-service";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

http.interceptors.request.use((config) => {
  let token = getDataFromCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
async function refreshAccessToken() {
  try {
    const refresh_token = getDataFromCookie("refresh_token");
    if (!refresh_token) {
      throw new Error("Refresh token not found");
    }
    const response = await axios.get(
      `http://store.go-clothes.uz:5555/v1/token/${refresh_token}`
    );
    const { access_token } = response.data;
    saveDataFromCookie("token", access_token);
    return access_token;
  } catch (err) {
    console.log(err);
  }
}
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccessToken();
      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = access_token;
      } else {
        console.error("Failed to refresh access token");
        return Promise.reject(error);
      }
    }
  }
);

export default http;
