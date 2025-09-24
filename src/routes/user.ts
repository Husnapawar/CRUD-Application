import express from 'express';
// const express = require('express'); 
const router = express.Router();
//const { searchUser } = require("../controllers/userController");
import {pool } from "../db";

import {handleGetAllUsers, handleCreateNewtUser, handleUpdateUserById, handleDeleteUserById} from "../controllers/user";



// Get all users
router.get('/',handleGetAllUsers); 

// Add a user
router.post('/',handleCreateNewtUser);

// Delete a user
router.delete('/:id',handleDeleteUserById);

// Update a user
router.put('/:id',handleUpdateUserById);

//login 


export default router;

// route parameter
