import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.104:6666";

console.log(axios.defaults.baseURL);

export default axios;
