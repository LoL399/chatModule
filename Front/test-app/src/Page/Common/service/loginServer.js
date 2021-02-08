import api from "./api";


const login = (id) => api.post(`${api.url.login}`, id);
const getRole = (data) => api.post(`${api.url.auth}`,data);
const getID = (token) => api.get(`${api.url.id}`,token);

export default { login, getRole, getID};