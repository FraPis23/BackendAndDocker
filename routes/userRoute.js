import express from "express";
import {
    addWarehouseToList,
    createUser,
    deleteWarehouseFromList,
    searchAllUsers,
    searchUserById
} from "../controllers/usersController.js";

const router = express.Router();

// Route to Create a new User
router.post('/', createUser);

// Route to Search All Users
router.get('/', searchAllUsers)

// Route to Search Users by Id
router.get('/:id', searchUserById);

// Route to Add Warehouse to WarehousesList
router.post('/add-warehouse', addWarehouseToList);

router.post('/delete-warehouse', deleteWarehouseFromList)

export default router;