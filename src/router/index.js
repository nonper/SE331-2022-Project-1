import { createRouter, createWebHistory } from "vue-router";
import PatientList from "../views/PatientList.vue";
import PatientDetail from "../views/PatientDetail.vue";
import vaccineDetail from "../views/VaccineView.vue";
import EventService from "@/services/EventService";
import NotFoundView from "../views/events/NotFoundView.vue";
import NetWorkErrorView from "../views/events/NetworkError.vue";
import NProgress from "nprogress";
import IndidualVaccDetail from "../components/IndividualVacc.vue";
import GStore from "@/store";

const routes = [
  {
    path: "/",
    name: "PatientList",
    component: PatientList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/patient/:id",
    name: "PatientDetail",
    component: PatientDetail,
    props: true,
    beforeEnter: (to) => {
      return EventService.getEventId(to.params.id)
        .then((res) => {
          GStore.event = res.data;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: "404Resource",
              params: { resource: to.params.id + " Page" },
            };
          } else {
            return { name: "NetworkError" };
          }
        });
    },
    children: [
      {
        path: "/vaccineDetails/:id",
        name: "IndividualVaccDetail",
        component: IndidualVaccDetail,
        prop: true,
        beforeEnter: (to) => {
          return EventService.getEventId(to.params.id)
            .then((res) => {
              GStore.event = res.data;
            })
            .catch((err) => {
              if (err.response && err.response.status == 404) {
                return {
                  name: "404Resource",
                  params: { resource: to.params.id + " Page" },
                };
              } else {
                return { name: "NetworkError" };
              }
            });
        },
      },
    ],
  },
  {
    path: "/vaccine",
    name: "vaccineDetail",
    component: vaccineDetail,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFoundView,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFoundView,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetWorkErrorView,
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
