<script>
export default {
  name: "TableData",
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
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
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.dob }}</td>
        <td>{{ user.mobile }}</td>
        <td>{{ user.address }}</td>
        <td>
          <button type="button" @click="$emit('edit-user', user)">Edit</button>
          <button type="button" @click="$emit('delete-user', user.id)">Delete</button>
          
        </td>
      </tr>
    </tbody>
  </table>
</template>

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
