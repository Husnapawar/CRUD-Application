<script lang="ts" >
import axios from "axios";
  import { defineComponent } from "vue";
import router from "../routes";

  interface User {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  mobile: string;
  address: string;
}
export default defineComponent ({
  name: "userList",

  data() {
    return {
      users: [] as User[],
      searchName: "",
      selectedUser: null,
      isEditing: false,
      sortKey: "" as keyof User | "",
      sortOrder: "asc",
      page: 1,
      limit: 10,
      total: 0,
       userToEdit: null as User | null
    };
  },

  computed: {
    sortedUsers(): User[] {
      let sorted = [...this.users];
      if (this.sortKey) {
        const key = this.sortKey as keyof User; 
        sorted.sort((a, b) => {
          let result = 0; 
          if (a[key] < b[key]) result = -1;
          if (a[key] > b[key]) result = 1;
          return this.sortOrder === "asc" ? result : -result;
        });
      }
      return sorted;
    },
    totalPages() {
      return Math.ceil(this.total / this.limit);
    }
  },

  methods: {
  
    async fetchUsers() {
      try {
        const res = await axios.get(`/api/users`, {
          params: {
            page: this.page,
            limit: this.limit,
            sortKey: this.sortKey,
            sortOrder: this.sortOrder,
            name: this.searchName
          }
        });
        this.users = res.data.data;   // backend returns data, total, page, limit
        this.total = res.data.total;
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    },
     prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchUsers();
    }
  },
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchUsers();
    }
  },
  goToPage(n:number) {
    this.page = n;  
    this.fetchUsers();
  },
  
  logout(){
    localStorage.removeItem("token");
    router.push("/");
  },
  editUser(user :User) {
         this.$router.push({
         path: "/add",
           query: { user: JSON.stringify(user), edit: "true" }

         });
       },

  

    async deleteUser(id:number) {
      alert("You want to delete this User");
      try {
        await axios.delete(`/api/users/${id}`);
        this.fetchUsers();
        alert("user delete successfully");
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    },

    adduser() {
      this.$router.push("/add");
    },

  },

  mounted() {
    this.fetchUsers();   
  },

  watch: {
    sortKey: "fetchUsers",
    sortOrder: "fetchUsers"
  }
});
</script>
<template>

   <div class="userlist-container">
    <div class="logout">
          <button class ="logout-btn" @click="logout">Logout</button>
    </div>
  <h1 class="page-title">CRUD APPLICATION</h1>
      <AddUser 
      @user-added="fetchUsers" 
      :user-to-edit="userToEdit" 
    />  
  <div id = "nav">
     <div id="search">
  <input 
    type="text" class="search-bar"  v-model="searchName"    placeholder="Search by name"
  />
   <button id="src" @click="fetchUsers">Search</button>
  </div>

   <div class="actions">
       <select v-model="sortKey" class="sort-dropdown">
  <option disabled value="">Sort By</option>
  <option value="first_name">First Name</option>
  <option value="last_name">Last Name</option>
  <option value="dob">DOB</option>
  <option value="mobile">Mobile</option>
  <option value="address">Address</option>
</select>

<select v-model="sortOrder" class="sort-dropdown">
  <option value="asc">Ascending</option>
  <option value="desc">Descending</option>
</select>


  <button class ="add-btn" @click="adduser">AddUsers</button>
  </div>
  </div>
  
  <table class="styled-table" border="1">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>DOB</th>
        <th>Mobile</th>
        <th>Address</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
<tr v-for="user in sortedUsers" :key="user.id">
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.dob.split("T")[0] }}</td>
        <td>{{ user.mobile }}</td>
        <td>{{ user.address }}</td>
        <td>
        
          <button class="edit-btn" type="button" @click="editUser(user)">Edit</button>

          <!-- <button @click="confirmDelete(user.id)">Delete</button> -->
          <!-- <input type="button" v-on:click="deleteData(user.user_id)" value="DELETE"> -->
        <button class="delete-btn" type="button" @click="deleteUser(user.id)">Delete</button>

          
        </td>
      </tr>
    </tbody>
  </table>
  <div class="pagination">
     <!-- prv btn -->
  <button class="page-btn" :disabled="page === 1" @click="prevPage">Previous</button>
   <!-- Numbered buttons -->
<button 
  v-if="page > 0" 
  @click="goToPage(page)">
  {{ page }}
</button>

<button 
  v-if="page < totalPages" 
  @click="goToPage(page + 1)">
  {{ page + 1 }}
</button>
  
   <!-- next btn -->
  <button class="page-btn" :disabled="page === totalPages" @click="nextPage">Next</button>
   <select class="page-list" v-model.number="page" @change="goToPage(page)">
    <option 
      v-for="n in totalPages" 
      :key="n" 
      :value="n"
    >
       {{ n }}
    </option>
  </select>
</div>

</div>
</template>


<style scoped>
.sort-dropdown {
  padding: 8px 12px;
  font-size: 15px;
  border-radius: 6px;
  border: 2px solid #3498db;
  margin-right: 10px;
  cursor: pointer;
}

.actions {
  display: flex;
  align-items: center;
}

.userlist-container {
  max-width: 1000px;
  margin: 30px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/*  Heading style */
h1 {
  text-align: center;
  background: #5dade2;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 28px;
}

/*  Navbar style */
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Add User button */
.logout{ 
  overflow: hidden;
}
.add-btn {
  background: linear-gradient(135deg, #3498db, #5dade2);
  color: white;
  border: none;
  padding: 10px 22px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 25px;   /* pill shape */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: background 0.3s, transform 0.2s ease-in-out;
}
.logout-btn{
   background: linear-gradient(135deg, #db5534, #cf1414);
  color: white;
  border: none;
  padding: 10px 22px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 25px;   
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: background 0.3s, transform 0.2s ease-in-out;
  float:right;
}
.add-btn:hover {
  background: linear-gradient(135deg, #2980b9, #3498db);
  transform: translateY(-2px);
}

.add-btn:active {
  transform: scale(0.96);
}


/*  Search section inline */
#search {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-bar {
  padding: 8px 12px;
  font-size: 15px;
  border-radius: 6px;
  border: 2px solid #3498db;
  outline: none;
}

/* Search button */
#src {
  background: linear-gradient(135deg, #5dade2, #3498db);
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0,0,0,0.1);
  transition: 0.3s;
} 

#src:hover {
  background: #3498db;
}

/*  Table styling */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.styled-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.styled-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/*  Action buttons */
.edit-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 5px;
  cursor: pointer;
}

.edit-btn:hover {
  background: #1e8449;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #c0392b;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.pagination button {
  background: rgb(73, 169, 201);
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.pagination button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
.page-btn {
  padding: 6px 12px;
  margin: 2px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
}

.page-btn.active {
  background-color: #333;
  color: white;
  font-weight: bold;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-list{
     background: rgb(73, 169, 201);
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>
