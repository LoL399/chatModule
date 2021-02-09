import axios from 'axios';
import Cookies from "js-cookie";
// import cookieUlti from '../common/cookieUlti';
const url ={    /// tat ca cac duong dan thi nam o day
    baseURL: "http://localhost:7000/admin",
    request: "request",
    usser: "user",
    room: "room",
    chat: "chat",
    role: "role"

};
const instance = axios.create({             
    baseURL: url.baseURL,                   
    headers:{
        "Content-Type":"application/json",  
        "Accept":"application/json" ,
        'Authorization': `Basic ${localStorage.getItem('info')}`
    },
});



export default {   
    url : url,
    axios: instance,
    get : instance.get,
    post : instance.post,
    put : instance.put,
    delete : instance.delete,
};