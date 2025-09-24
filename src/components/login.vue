<template>
<div class="container">
<h1>User Login </h1>
    <form @submit.prevent="login">
   <label for="username">Username</label>
<input 
  type="text" 
  id="username" 
  name="username" 
  v-model="username" 
  placeholder="Username" 
  required 
/>

<label for="password">Password</label>
<input 
  type="password" 
  id="password" 
  name="password" 
  v-model="password" 
  placeholder="Password" 
  required 
/>

    <button class="btn" type="submit">Login</button>
    </form>
</div>
</template>
<style scoped>  
.container{
    
   max-width: 500px;
   margin:40px auto;
   border-radius: 12px;
   background-color: #ffff;
   padding: 25px;
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1);
}
h1{
   text-align: center;
   background-color: #2682c4;
   padding: 12px;
   border-radius: 4px;
   font-weight: 600;
   font-size: 25px;
}
form{
    display: flex;
    flex-direction: column;
    gap:12px; 
}
label{
    font: size 14px;
    font-weight: 500;
    color:#555;
    text-align: left;
}
input{
    padding: 10px 12px;
    font-size: 15px;
    border-radius:1px solid #ccc;
    transition:0.3s;
    outline: none;
}
input:focus{
    border-color: #3498db;
     box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}
button{
    display: flex;
    justify-content: center;
    margin-top: 15px;
    flex:1;
    padding: 12px;
    font-size: 16px;
    font-weight: 500;
    border:none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
     background-color: #5dade2;  
  color: white;
  margin-right: 10px;
}

.btn:hover {
  background-color: #3498db;  
}
</style>
<!-- <script lang="ts" >

import { defineComponent, ref } from "vue";
import axios from "axios";
const router = useRouter();

export default defineComponent({
  name: "LoginPage",
  setup() {
     const username = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const response = await axios.post("/api/auth/login", {
          username: username.value,
          password: password.value,
        });

        alert("Login successful ");
        if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      this.$router.push({ name: "userList" });
    }
        // localStorage.setItem("token", response.data.token);
      } catch (err: any) {
        alert(err.response?.data?.error || "Login failed ");
      }
    };

    return { username, password, login };
  },
});
</script> -->
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const username = ref("");
const password = ref("");

async function login() {
  try {
    const response = await axios.post("/api/auth/login", {
      username: username.value,
      password: password.value,
     
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      router.push({ name: "userList" }); //  redirect after login
    }
  } catch (error) {
    console.error("Login failed", error);
    alert("Invalid username or password");
  }
}
</script>

