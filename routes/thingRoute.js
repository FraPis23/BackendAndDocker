import express from "express";
import {
    addThingQuantity,
    createThing, deductThingQuantity,
    getThingById,
    updateThingDetails
} from "../controllers/thingsController.js";

const router = express.Router();

// Route to Create a new Thing
router.post('/', createThing);

// Route to Update a Thing
router.post('/update-details', updateThingDetails);

// Route to Increse the Quantity of a Thing
router.post('/add-quantity', addThingQuantity);

// Route to Reduce the Quantity of a Thing
router.post('/deduct-quantity', deductThingQuantity);

// Route to Get Thing By Id
router.get('/:id', getThingById);

export default router;