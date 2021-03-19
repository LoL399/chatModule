import api from "./api";

const getById = id => {              
    return api.post(`https://localhost:5001/chat/getbyId`,id);
};

const list = () => api.get(`${api.url.chat}/get`);
const add = data => api.post(`https://localhost:5001/chat/create`,data);
const getRoom  = (skip) => api.post(`https://localhost:5001/chat/room`,skip);

export default { list, add,getById,getRoom};