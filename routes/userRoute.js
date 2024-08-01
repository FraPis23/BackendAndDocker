import express from "express";
import {
    addWarehouseToList,
    createUser,
    deleteWarehouseFromList,
    searchAllUsers,
    searchUserById,
    searchUserByNameAndLastName
} from "../controllers/usersController.js";

const router = express.Router();

// Route to Create a new User
router.post('/', createUser);

// Route to Search All Users
router.get('/', searchAllUsers)

// Route to Search Users by Name and/or LastName
router.get('/search', searchUserByNameAndLastName);

// Route to Add a Warehouse to WarehousesList
router.post('/add-warehouse', addWarehouseToList);

// Route to Delete a Warehouse to WarehousesList
router.post('/delete-warehouse', deleteWarehouseFromList);

// Route to Search Users by Id
router.get('/:id', searchUserById);

export default router;