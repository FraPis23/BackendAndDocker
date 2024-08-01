import express from "express";
import {
    createThing,
    getThingById,
    updateThingDetails
} from "../controllers/thingsController.js";


const router = express.Router();

// Route to Create a new Thing
router.post('/', createThing);

// Route to Update a Thing
router.post('/update-details', updateThingDetails);

// Route to Get Thing By Id
router.get('/:id', getThingById);

export default router;