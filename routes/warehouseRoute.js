import express from 'express';
import {
    createWarehouse,
    deleteWarehouse,
    getWarehoseById,
    createThing,
    deleteThing
} from "../controllers/warehouseController.js";


const router = express.Router();

// Route to Create a new Warehouse
router.post('/', createWarehouse);

// Route to Delete a Warehouse by Id
router.post('/:id', deleteWarehouse);

// Route to Search All Warehouses
router.get('/:id', getWarehoseById);

// Route to Create a new Thing
router.post('/new-thing', createThing)

// Route to Delete a Thing from the Warehouse
router.post('/delete-thing', deleteThing);



export default router;