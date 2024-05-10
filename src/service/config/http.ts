import axios from "axios";
import { getDataFromCookie } from "@token-service";

const http = axios.create({
    baseURL: "http://store.go-clothes.uz:5555/v1"
});

http.interceptors.request.use((config):any=>{
    let token = getDataFromCookie("token");
    if(token){
        config.headers.Authorization = `${token}`;
    }
    return config
})

export default http