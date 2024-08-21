import express from "express";
import {
    addUser,
    deleteWarehouseFromList,
    searchUserByNickname,
    getUserBySub,
    getWarehousesId,
} from "../controllers/usersController.js";

const router = express.Router();

// Route to Create a new User
router.post('/', addUser);

// Route to Find a User
router.post('/sub', getUserBySub);

// Route to Search Users by Name and/or LastName
router.post('/search', searchUserByNickname);

// Route to Return Warehouses Id
router.post('/returnWarehouses', getWarehousesId)

// Route to Delete a Warehouse to WarehousesList
router.post('/delete-warehouse', deleteWarehouseFromList);

export default router;