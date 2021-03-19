import api from "./api";

const list = () => api.get(`${api.url.room}/list`);
const roomInfo = (id) => api.get(`${api.url.room}/get/${id}`)


export default { list,roomInfo};