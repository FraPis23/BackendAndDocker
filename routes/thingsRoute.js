import express from 'express';
import {Thing} from "../models/thingModel.js";

const router = express.Router();

// Route to Create a new Thing
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name
        ) {
            return response.status(400).send("Fornire il nome dell'oggetto");
        }
        const newThing = {
            name: request.body.name,
            quantity: request.body.quantity ? request.body.quantity : undefined,
        }

        const thing = await Thing.create(newThing);

        return response.status(201).send(thing);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
});

export default router;