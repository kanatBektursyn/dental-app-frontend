import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

axios.defaults.baseURL = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:6666`;

console.log(axios.defaults.baseURL);
export default axios;
