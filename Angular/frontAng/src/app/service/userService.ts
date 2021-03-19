import api from "./api";

const getById = id => {              
    return api.get(`${api.url.usser}/get/${id}`);
};

const list = () => api.get(`${api.url.usser}/get`);
const add = data => api.post(`${api.url.usser}/create`,data);
const update  = (id) => api.put(`${api.url.usser}/update/${id}`);
const info = () => api.get(`${api.url.usser}/get/info`)
export default { list, add, update,getById,info};