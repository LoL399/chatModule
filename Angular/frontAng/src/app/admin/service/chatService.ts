import api from "./api";

const getById = id => {              
    return api.post(`${api.url.chat}/get/${id}`);
};

const list = () => api.get(`${api.url.chat}/get`);
const add = data => api.post(`${api.url.chat}/create`,data);
const getRoom  = (id, skip) => api.post(`${api.url.chat}/${id}`,skip);

export default { list, add,getById,getRoom};