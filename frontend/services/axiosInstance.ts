import { projectConstants } from "@/util/constants";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(projectConstants.token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const token = localStorage.getItem(projectConstants.token);
        if (token && error.response && error.response.status === 401) {
          localStorage.removeItem(projectConstants.token);
          window.location.href = '/sign-in';
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;