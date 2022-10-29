import apiClient from "./AxiosClient";

export default {
  getDoctors() {
    return apiClient.get("/doctors");
  },
  postComment(comment) {
    return apiClient.post("/addComment", comment);
  },
  saveEvent(event) {
    return apiClient.post("/patient", event);
  },
};
