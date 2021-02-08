import api from "./api";

// const getById = id => {              
//     return api.post(`${api.url.chat}/get/${id}`);
// };

const list = (id,data) => api.post(`${api.url.chat}/${id}`,data);
const add = data => api.post(`${api.url.chat}/create`,data);
const createRoom = (data) => api.post(`${api.url.room}/create`,data);
const roomList = (data) => api.post(`${api.url.room}/getRoom`,data);

export default { list, add,roomList,createRoom};