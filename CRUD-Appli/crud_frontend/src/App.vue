<script>
import axios from "axios";
import FormData from "./components/FormData.vue";
import TableData from "./components/TableData.vue";

export default {
  name: "App",
  components: { FormData, TableData },
  data() {
    return {
      users: [],        // this will hold all users
      selectedUser: null,
      isEditing: false
    };
  },
  methods: {
    // Fetch all users
    async fetchUsers() {  
      try {
        const res = await axios.get('/api/users');
        this.users = res.data;  // assign response to users
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    },

    // Delete user
    async deleteUser(id) {
      try {
        await axios.delete(`/api/users/${id}`);
        this.fetchUsers(); // refresh list
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    },

    // Start editing user
    editUser(user) {
      this.selectedUser = { ...user }; // copy user into form
      this.isEditing = true;
    },

    // Update user in DB
    async updateUser() {
      try {
        const { id, first_name, last_name, dob, mobile, address } = this.selectedUser;

        await axios.put(`/api/users/${id}`, {
          first_name,
          last_name,
          dob,
          mobile,
          address
        });

        this.fetchUsers();   // refresh list
        this.cancelEdit();   // reset form
      } catch (err) {
        console.error("Error updating user:", err);
      }
    },

    // Cancel editing
    cancelEdit() {
    
      this.selectedUser = null;
      this.isEditing = false;
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<template>
  <div>
    <FormData 
      :user-to-edit="selectedUser" 
      :is-editing="isEditing"
      @user-added="fetchUsers"
      @user-updated="updateUser"
      @cancel-edit="cancelEdit"
    />

    <TableData 
      :users="users" 
      @delete-user="deleteUser" 
      @edit-user="editUser" 
    />
  </div>
</template>

<style>
/* Add styles here later */
</style>
