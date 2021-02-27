import axios from "axios";

const setAuthToken = (token, headerToken) => {
  if (token) {
    // APPly to every request
    axios.defaults.headers.common["Authorization"] = token;
    axios.defaults.headers.common["x-api-key"] = headerToken;
  } else {
    //Delete the auth header
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["x-api-key"];
  }
};
export default setAuthToken;