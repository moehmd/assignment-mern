import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3666/employee`
});

const get = () => {
  return api.get("/list");
};

const manage = (id, data) => {
  if(id) {
    return api.put(`/update/${id}`, data);
  } else {
    return api.post("/create", data);
  };
};

const remove = (id) => {
  return api.delete(`/delete/${id}`);
};

const employeeService = {
    get,
    manage,
    remove
};

export default employeeService;