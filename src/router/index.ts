import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue'),
  },
  {
    path: "/studysass",
    name: "Studysass",
    component: () => import('../views/studysass/index.vue'),
  },
  {
    path: "/studyless",
    name: "Studyless",
    component: () => import('../views/studyless/index.vue'),
  },
  {
    path: "/observe",
    name: "Observe",
    component: () => import('../views/observe/index.vue'),
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
