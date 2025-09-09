<template>
     <div class="container">
       <h1>Add Users</h1>
    <form @submit.prevent="handleSubmit">
      <label for="First_Name">First Name</label>
      <input type="text" v-model="first_name" placeholder="First Name" required />
      <label for="Last_name">Last Name</label>
      <input type="text" v-model="last_name" placeholder="Last Name" required />
      <label for="DOB">DOB</label>
      <input type="date" v-model="dob"  required />
      <label for="MOB">Mob.No </label>
      <input type="number " v-model="mobile" placeholder="Mobile" required />
      <label for="Address">Address</label>
     <textarea v-model="address" placeholder="Enter full address..." rows="3" required></textarea>
      <button class="btn" type="submit">{{ editing ? 'Update' : 'Submit' }}</button>
      <button  class="btn"  type="button" v-if="editing" @click="cancelEdit">Cancel</button>

    </form>
   
  </div>
</template>


<script>  
import axios from "axios";
export default{
    name:"AddUser",
      props: {  
    userToEdit :{
      type:   Object,
      default: null
    },
  },
  data() {
    return {
    //  id :null,
      first_name: '',
      last_name: '',
      dob: '',
      mobile: '',
      address: '',
       selectedUser: null,
      editing: false,   //  added to avoid undefined error
      editingid: null,
      isEditing: false

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

      }else {
        this.resetForm();
      }
    },
},
},
  mounted() {
  if (this.$route.query.edit) {
    const user = JSON.parse(this.$route.query.user);
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.dob = user.dob;
    this.mobile = user.mobile;
    this.address = user.address;
    this.editing = true;
  }
},
methods:{
 

async handleSubmit() {        
 try{
  if(this.editing){
      // update user  
// await axios.put(`/api/users/${this.id}`, {
await this.updateUser();

  
//   first_name: this.first_name,
//   last_name: this.last_name,
//   dob: this.dob,
//   mobile: this.mobile,
//   address: this.address
// });
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

     // update User
//   async updateUser() {
//       try {
//         const { id, first_name, last_name, dob, mobile, address } = this.selectedUser;

//         await axios.put(`/api/users/${id}`, {
//           first_name,
//           last_name,
//           dob,
//           mobile,
//            address
//         });

        
//         this.fetchUsers();   // refresh list
//         this.cancelEdit();   // reset form
//  } catch (err) {
//         console.error("Error updating user:", err);
//       }
//     },

    async updateUser() {
      try {
        await axios.put(`/api/users/${this.editingid}`, this.user);
        alert("User updated successfully!");
        this.resetForm();
      } catch (err) {
        console.error("Error updating user:", err);
      }
    },

//cancle edit
  cancelEdit() {
      this.resetForm();
    },
    // reset form
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
  max-width: 500px;
  margin: 40px auto;
  padding: 25px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  background: #2682c4;   /* ✅ light blue */
  color: #2c3e50;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-size: 14px;
  color: #555;
  text-align: left;
  font-weight: 500;
}

input,
textarea {
  padding: 10px 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}

textarea {
  resize: none;  /* prevents ugly resizing */
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.btn {
  background-color: #5dade2;  /* ✅ light blue */
  color: white;
  margin-right: 10px;
}

.btn:hover {
  background-color: #3498db;  /* darker blue on hover */
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
}
</style>

