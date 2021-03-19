import axios from 'axios';

// import cookieUlti from '../common/cookieUlti';
const url ={    /// tat ca cac duong dan thi nam o day
    baseURL: "https://localhost:5001/admin",
    request: "request",
    usser: "user",
    room: "room",
    chat: "chat",
    role: "role",
    login:"login"

};
const urlGuess ={    /// tat ca cac duong dan thi nam o day
    baseURL: "https://localhost:5001/",
    login:"login"

};
const instance = axios.create({             
    baseURL: url.baseURL,                   
    headers:{
        "Content-Type":"application/json",  
        "Accept":"application/json" ,
        'Authorization': `Bearer ${localStorage.getItem('info')}`
    },
});



export default {   
    guest: urlGuess,
    url : url,
    axios: instance,
    get : instance.get,
    post : instance.post,
    put : instance.put,
    delete : instance.delete,
};