import api from "./api";



const token = (data) => api.post(`https://localhost:5001/login`,data);

export default { token};