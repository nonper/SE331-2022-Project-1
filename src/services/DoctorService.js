import apiClient from "./AxiosClient";

export default {
  getDoctors() {
    return apiClient.get("/doctors");
  },
  getVaccine() {
    return apiClient.get("/vaccines");
  },
  postComment(comment) {
    return apiClient.post("/addComment", comment);
  },
  saveEvent(event) {
    return apiClient.post("/patient", event);
  },
};
