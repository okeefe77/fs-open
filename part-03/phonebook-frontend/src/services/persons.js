import axios from "axios";

const service = axios.create({ baseURL: "/api/persons" });

const getAll = () => service.get()
  .then(response => response.data);

const create = newPerson => service.post('', newPerson)
  .then(response => response.data);

const update = updatedPerson => service.put(`/${updatedPerson.id}`, updatedPerson)
  .then(response => response.data);

const remove = id => service.delete(`/${id}`)
  .then(response => response.data);

export default {
  getAll,
  create,
  update,
  remove
}