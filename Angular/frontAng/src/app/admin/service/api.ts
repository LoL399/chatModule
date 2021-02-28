import axios from 'axios';

// import cookieUlti from '../common/cookieUlti';
const url ={    /// tat ca cac duong dan thi nam o day
    baseURL: "https://localhost:5001/admin",
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
        // 'Authorization': `Basic ${localStorage.getItem('info')}`
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