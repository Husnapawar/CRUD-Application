import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";   

import axios , {AxiosError, type InternalAxiosRequestConfig} from "axios";

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {

  return config;
},(error) =>{
  return Promise.reject(error);
}
); 

createApp(App).use(router).mount("#app");
