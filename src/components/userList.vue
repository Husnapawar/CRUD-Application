<script>
import axios from "axios";
  
export default {
  name: "userList",

  data() {
    return {
      users: [],
      searchName: "",
      selectedUser: null,
      isEditing: false,
      sortKey: "",
      sortOrder: "asc",
      page: 1,
      limit: 10,
      total: 0,
       userToEdit: null
    };
  },

  computed: {
    sortedUsers() {
      let sorted = [...this.users];
      if (this.sortKey) {
        sorted.sort((a, b) => {
          let result = 0;
          if (a[this.sortKey] < b[this.sortKey]) result = -1;
          if (a[this.sortKey] > b[this.sortKey]) result = 1;
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
    //  your methods stay here
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
       
        this.users = res.data.data;   // backend returns {data, total, page, limit}
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
  goToPage(n) {
    this.page = n;
    this.fetchUsers();
  },
  
  editUser(user) {
         this.$router.push({
         path: "/add",
           query: { user: JSON.stringify(user), edit: true }
         });
       },

    // async searchUsers() {
    //   try {
    //     const res = await axios.get("/api/users/search", {
    //       params: { name: this.searchName }
    //     });
    //     this.users = res.data;
    //   } catch (err) {
    //     console.error("Error searching users:", err);
    //   }
    // },

    async deleteUser(id) {
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
};
</script>



<template>
   <div class="userlist-container">
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
        <td>{{ user.dob }}</td>
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
 <!--  show first 2 pages -->
  <button
    v-for="n in Math.min(2, totalPages)" 
    :key="n" 
    class="page-btn" 
    :class="{ active: page === n }" 
    @click="goToPage(n)" 
  >
    {{ n }}
  </button>

  <!-- Ellipsis if more than 3 pages -->
  <button v-if="totalPages > 3" class="page-btn" >...</button>

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
