import express from 'express';
// const express = require('express'); 
const router = express.Router();
import { verifyToken } from '../middleware/auth';
//const { searchUser } = require("../controllers/userController");
import {handleGetAllUsers, handleCreateNewtUser, handleUpdateUserById, handleDeleteUserById} from "../controllers/user";
import { uservalidation } from '../middleware/uservalidation';
import { authorisePermission } from '../middleware/rbacMiddleware';

// Get all users
router.get('/',verifyToken, authorisePermission('read_record'), handleGetAllUsers); 

// Add a user
router.post('/',uservalidation, authorisePermission('create_record'),  handleCreateNewtUser);

// Delete a user
router.delete('/:id',authorisePermission('delete_record'), handleDeleteUserById);

// Update a user
router.put('/:id', uservalidation,authorisePermission('update_record'), handleUpdateUserById);

//login 


export default router;

// route parameter
