import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

axios.defaults.baseURL = "http://192.168.1.103:6666";

console.log(axios.defaults.baseURL);

export default axios;
