
import { createRouter, createWebHistory } from "vue-router";

import userList from "./components/userList.vue";
import addUser from "./components/addUser.vue";
import login from "./components/login.vue";


const routes = [
  {
    name: "userList",
    path: "/home",
    component: userList, 
    meta: { requiresAuth: true },  
  },
  {
    name: "addUser",
    path: "/add",
    component: addUser, 
    meta: { requiresAuth: true },   
  },
  {
    name:"login",
    path:"/",
    component: login,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    // not logged in → redirect to login
    return next({ name: "login" });
  }
  next();
});
export default router;
