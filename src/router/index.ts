import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  { path: '/', component: () => import('../views/TxtToExcel.vue') },
  { path: '/txt-to-excel', component: () => import('../views/TxtToExcel.vue') },
  { path: '/excel-to-txt', component: () => import('../views/ExcelToTxt.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
