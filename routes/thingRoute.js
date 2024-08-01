import express from "express";
import {
    createThing,
    addThingQuantity,
    deductThingQuantity,
    updateThingDetails,
    deleteThing
} from "../controllers/thingsController.js";

const router = express.Router();

// Route to Create a new Thing
router.post('/', createThing);

// Route to Delete a Thing
router.post('/delete', deleteThing);

// Route to Update a Thing
router.post('/update-details', updateThingDetails);

// Route to Increse the Quantity of a Thing
router.post('/add-quantity', addThingQuantity);

// Route to Reduce the Quantity of a Thing
router.post('/deduct-quantity', deductThingQuantity);


export default router;