import api from "./api";

const list = (data) => api.post(`${api.url.room}`,data);
const add = data => api.post(`${api.url.room}/create`,data);
const hidden = data => api.post(`${api.url.room}/hidden`,data);
const attend = data => api.put(`${api.url.room}/attend`,data);
// const update  = (id) => api.put(`${api.url.chat}/update/${id}`);
// const getRoom  = (id, skip) => api.post(`${api.url.chat}/${id}`,skip);
// const getRoomList = () => api.get(`${api.url.chat}`);

export default { list, add, hidden, attend};