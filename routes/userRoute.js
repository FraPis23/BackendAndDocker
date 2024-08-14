import express from "express";
import {
    addWarehouseToList,
    addUser,
    deleteWarehouseFromList,
    searchUserByNameAndLastName,
    getUserBySub,
} from "../controllers/usersController.js";
import {deleteUser} from "../controllers/warehouseController.js";

const router = express.Router();

// Route to Create a new User
router.post('/', addUser);

// Route to Find a User
router.post('/sub', getUserBySub);

// Route to Search Users by Name and/or LastName
router.get('/search', searchUserByNameAndLastName);

// Route to Add a Warehouse to WarehousesList
router.post('/add-warehouse', addWarehouseToList);

// Route to Delete a Warehouse to WarehousesList
router.post('/delete-warehouse', deleteWarehouseFromList);

export default router;