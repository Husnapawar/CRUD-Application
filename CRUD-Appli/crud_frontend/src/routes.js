import { createRouter, createWebHistory } from "vue-router";

import userList from "./components/userList.vue";
import addUser from "./components/addUser.vue";

const routes = [
  {
    name: "userList",
    path: "/",
    component: userList,   //  correct 
  },
  {
    name: "addUser",
    path: "/add",
    component: addUser,    //  correct
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
