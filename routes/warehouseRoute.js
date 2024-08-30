import express from 'express';
import {
    addWarehouse,
    getWarehoseById,
    deleteWarehouse,
    createThing,
    getUsers,
    deleteUser,
    addUser,
    getThings,
    /*
    deleteThing,
    createOperation
    ,
    addAdmin,
    deleteAdmin,

    getThingByName,
    deleteOperations,
    getAdmins,
    getOperations*/
} from "../controllers/warehouseController.js";


const router = express.Router();


// Route to Create a new Warehouses
router.post('/', addWarehouse);

// Route to get list of users
router.post('/get-users', getUsers);

// Route to add a new users
router.post('/add-user', addUser);

// Route to  delete users
router.post('/delete-user', deleteUser);

// Route to Create a new Things
router.post('/create-thing', createThing)

// Route to get a new things
router.get('/get-things', getThings);

// Route to Delete a Warehouse by Id
router.post('/:id', deleteWarehouse);

// Route to Search All Warehouses
router.get('/:id', getWarehoseById);


/*
// Route to Delete a Thing from the Warehouses
router.post('/delete-thing', deleteThing);

// Route to create a new operations
router.post('/create-operation', createOperation);

// Route to create a new admins
router.post('add-admin', addAdmin);

// Route to delete admins
router.post('/delete-admin', deleteAdmin);



// Route to get a thingsByName
router.get('/get-thingsByName', getThingByName);

// Route to delete a operations
router.post('/delete-operation', deleteOperations);

// Route to get a new admins
router.get('/get-admin', getAdmins);

// Route to get a new operations
router.get('/get-operation', getOperations);
*/



export default router;