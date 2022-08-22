import { createRouter, createWebHistory } from "vue-router";
import PatientList from "../views/PatientList.vue";

const routes = [
  {
    path: "/",
    name: "PatientList",
    component: PatientList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
