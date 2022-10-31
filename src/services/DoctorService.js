import apiClient from "./AxiosClient";

export default {
  getDoctors() {
    return apiClient.get("/doctors");
  },
  getDoctor(id) {
    return apiClient.get("/doctor/" + id);
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
