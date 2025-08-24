// index.js
const express = require('express');
const app = express();
// const cors = require('cors');
const port = 3000;

// Middleware
app.use(express.json());
// app.use(cors());

// OR to allow only Vue frontend:
// app.use(cors({
//   origin: "http://localhost:8080",  
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"]
// }));

// Import user routes
const userRoutes = require('./routes/user'); // correct path (make sure folder is named routes/user.js)
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
