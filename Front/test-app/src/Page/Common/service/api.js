import axios from 'axios';
import Cookies from "js-cookie";
// import cookieUlti from '../common/cookieUlti';
const url ={    /// tat ca cac duong dan thi nam o day
    baseURL: "http://localhost:7000/",
    login: "login",
    auth: "getRole",
    id: "getID"

};
const instance = axios.create({             
    baseURL: url.baseURL,                   
    headers:{
        "Content-Type":"application/json",  
        "Accept":"application/json" ,
        'Authorization': `Basic ${Cookies.get("info")}`
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