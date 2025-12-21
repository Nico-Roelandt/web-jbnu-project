import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/homePage.vue";
import AdminPage from "../views/adminPage.vue";
import GamePage from "../views/gamePage.vue";
import RankingPage from "../views/rankingPage.vue";
import UserPage from "../views/userPage.vue";
import LoginPage from "../views/loginPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },

  {
    path: "/user",
    component: UserPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/game",
    component: GamePage,
    meta: { requiresAuth: true }
  },
  {
    path: "/ranking",
    component: RankingPage
  },
  { 
    path: "/admin", 
    component: AdminPage,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.is_admin) {
        next();
      } else {
        next("/login"); 
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

/**
 * Navigation guard to protect routes that require authentication
 */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  next();
});

export default router;
