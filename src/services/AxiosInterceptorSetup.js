import apiClient from "./AxiosClient";
apiClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      request.headers["Authorization"] = "Bearer " + token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
