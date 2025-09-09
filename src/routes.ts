
import { createRouter, createWebHistory } from "vue-router";

import userList from "./components/userList.vue";
import addUser from "./components/addUser.vue";



const routes = [
  {
    name: "userList",
    path: "/",
    component: userList,   //  
  },
  {
    name: "addUser",
    path: "/add",
    component: addUser,    //  
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
