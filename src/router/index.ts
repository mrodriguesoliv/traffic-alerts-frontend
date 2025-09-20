import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "@/pages/auth/components/LoginForm.vue";
import LandingPage from "@/pages/home/LandingPage.vue";
import DashboardPage from "@/pages/home/views/DashboardPage.vue";

const routes = [
  {
    path: '/auth/signin',
    name: 'SignIn',
    component: LoginForm,
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: LandingPage,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardPage,
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

  if (to.name === "SignIn" && token) {
    return next({ name: "Dashboard" }); 
  }

  next();
});

export default router;
