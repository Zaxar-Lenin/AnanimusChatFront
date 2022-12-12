import axios from "axios";

export const instance = axios.create({
    baseURL: "https://ananimuschatserver-production.up.railway.app/",
    // baseURL: "http://localhost:5050",
})