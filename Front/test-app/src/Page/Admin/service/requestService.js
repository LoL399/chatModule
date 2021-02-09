import api from "./api";

const getById = id => {              
    return api.post(`${api.url.request}/get/${id}`);
};

const list = (data) => api.post(`${api.url.request}/get`,data);
const add = data => api.post(`${api.url.request}/create`,data);
const update  = (id,data) => api.put(`${api.url.request}/update/${id}`,data);

export default { list, add, update,getById};