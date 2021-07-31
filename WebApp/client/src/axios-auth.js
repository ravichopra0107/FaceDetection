import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
instance.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
instance.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("user");
    console.log(userData);
    if (userData) {
      let accessToken = userData.token;
      if (accessToken) {
        config.headers = Object.assign(
          {
            "x-access-token": accessToken,
          },
          config.headers
        );
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;