import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import loginView from "../views/LoginView.vue";
import registerView from "../views/RegisterView.vue";
import LoginGoogle from "../views/LoginGoogle.vue";
import shareView from "../views/shareView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/folders",
    component: HomeView,
  },
  {
    path: "/folders/:id",
    name: "folderDetail",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: loginView,
  },
  {
    path: "/register",
    name: "register",
    component: registerView,
  },
  {
    path: "/share/:token",
    name: "share",
    component: shareView,
  },

  {
    path: "/auth/google",
    name: "loginGoogle",
    component: LoginGoogle,
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "current",
});

export default router;
