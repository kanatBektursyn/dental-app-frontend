import axios from "../../core/axios";

export default {
  get: () => axios.get("/messages"),
  remove: (id) => axios.delete("/messages/" + id),
  add: (values) => axios.post("/messages", values),
};
