import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "@/pages/auth/LoginPage.vue";
import LandingPage from "@/pages/home/LandingPage.vue";
import DashboardPage from "@/pages/home/views/DashboardPage.vue";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
  },
  {
    path: "/",
    component: LandingPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardPage,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return next({ name: "Auth" });
  }

  if (to.name === "Auth" && token) {
    return next({ name: "Dashboard" });
  }

  next();
});

export default router;
