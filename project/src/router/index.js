import { createRouter, createWebHistory } from "vue-router";
import PatientList from "../views/PatientList.vue";
import PatientDetail from "../views/PatientDetail.vue";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "PatientList",
    component: PatientList,
  },
  {
    path: "/patient/:id",
    name: "PatientDetail",
    component: PatientDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
