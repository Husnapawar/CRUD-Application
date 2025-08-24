<template>
  <div class="container">
    <h1>CRUD APP</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="first_name" placeholder="First Name" required />
      <input type="text" v-model="last_name" placeholder="Last Name" required />
      <input type="date" v-model="dob"  required />
      <input type="number " v-model="mobile" placeholder="Mobile" required />
      <input type="text" v-model="address" placeholder="Address" required />


      <button type="submit">{{ editing ? 'Update' : 'Submit' }}</button>
      <button type="button" v-if="editing" @click="cancelEdit">Cancel</button>

    </form>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "FormData",
  props: {  
    userToEdit :{
      type:   Object,
      default: null
    },
  },
  data() {
    return {
      id :null,
      first_name: '',
      last_name: '',
      dob: '',
      mobile: '',
      address: '',
      editing: false,   //  added to avoid undefined error
      editingid: null,

  }
  },
// wacher
// feach user after editing
watch: {
  userToEdit: {
    immediate: true,
    handler(newVal) {
      if (newVal) {
        this.id = newVal.id;
        this.first_name = newVal.first_name;
        this.last_name = newVal.last_name;
        this.dob = newVal.dob;
        this.mobile = newVal.mobile;
        this.address = newVal.address;
        this.editing = true;
        
      }
    },
   },
},

methods:{
async handleSubmit() {
 try{
  if(this.editing){
      // update user  
    await axios.put(`/api/users/${this.id}`, {
  first_name: this.first_name,
  last_name: this.last_name,
  dob: this.dob,
  mobile: this.mobile,
  address: this.address
});
    alert("user update succeessfully");
  }else{
      // add new user here
    await axios.post("/api/users", {
      first_name: this.first_name,
      last_name: this.last_name,
      dob: this.dob,
      mobile: this.mobile,
      address: this.address,
    });
    alert("user added successfully");
  }
     
  this.resetForm();
  this.$emit("user-added");
}
catch(err){
  console.error(err);
}
},
  cancelEdit() {
      this.resetForm();
    },
    resetForm() 
{
   this.id = null;
  this.first_name = "";
    this.last_name = "";
    this.dob = "";
    this.mobile = "";
    this.address = "";
    this.editing=false;
  //  this.editingId = null;
}
}
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}

.btn.edit {
  background: #3498db;
  color: #fff;
}

.btn.delete {
  background: #e74c3c;
  color: #fff;
}

.btn.cancel {
  background: #7f8c8d;
  color: #fff;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th, .styled-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.styled-table th {
  background: #2c3e50;
  color: #fff;
}

.styled-table tr:nth-child(even) {
  background: #f2f2f2;
}

.styled-table tr:hover {
  background: #f9e79f;
}
</style>
