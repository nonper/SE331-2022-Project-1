import apiClient from "./AxiosClient";

export default {
  getEvents(perPage, page) {
    return apiClient.get("/patients?_limit=" + perPage + "&_page=" + page);
  },
  //Added new call
  getEventId(id) {
    return apiClient.get("/patients/" + id);
  },
  saveEvent(event) {
    return apiClient.post("/patient", event);
  },
  uploadFile(file) {
    let formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
