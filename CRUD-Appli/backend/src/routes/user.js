const express = require('express');
const router = express.Router();
//const { searchUser } = require("../controllers/userController");
const pool = require('../db');

const { handleGetAllUsers,
     handleUpdateUserById ,
    handleDeleteUserById, 
    handleCreateNewtUser,
   // searchUser
    } =  require("../controllers/user");
// Get all users
router.get('/',handleGetAllUsers); 

// Add a user
router.post('/',handleCreateNewtUser);

// Delete a user
router.delete('/:id',handleDeleteUserById);

// Update a user
router.put('/:id',handleUpdateUserById);

//  router.get('/search',searchUser);

module.exports = router;


