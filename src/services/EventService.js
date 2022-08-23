import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents(perPage, page) {
    return apiClient.get("/patient?_limit=" + perPage + "&_page=" + page);
  },
  //Added new call
  getEventId(id) {
    return apiClient.get("/patient/" + id);
  },
};
