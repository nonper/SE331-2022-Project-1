import { reactive } from "vue";

export default reactive({
  event: null,
  flashMessage: "",
  currentUser: JSON.parse(localStorage.getItem("user")),
});
