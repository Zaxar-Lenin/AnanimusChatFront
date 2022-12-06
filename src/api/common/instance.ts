import axios from "axios";

export const instance = axios.create({
    baseURL: "ananimus-chat-server.vercel.app",
})