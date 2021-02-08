import api from "./api";

const getById = id => {              
    return api.post(`${api.url.request}/get/${id}`);
};

const list = () => api.get(`${api.url.request}/get`);
const add = data => api.post(`${api.url.request}/create`,data);
const update  = (id) => api.put(`${api.url.request}/update/${id}`);

export default { list, add, update,getById};