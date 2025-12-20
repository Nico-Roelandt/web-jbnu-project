import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/homePage.vue';
import AdminPage from '../views/adminPage.vue';
import GamePage from '../views/gamePage.vue';
import RankingPage from '../views/rankingPage.vue';
import UserPage from '../views/userPage.vue';
import LoginPage from '../views/loginPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/admin', component: AdminPage },
  { path: '/game', component: GamePage },
  { path: '/ranking', component: RankingPage },
  { path: '/user', component: UserPage },
  { path: '/login', component: LoginPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
