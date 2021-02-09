import api from "./api";


const list = () => api.get(`${api.url.role}/get`);


export default { list};