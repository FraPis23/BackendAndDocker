import express from 'express';
import {Thing} from "../models/thingModel.js";
import {createThing} from "../controllers/thingController.js";

const router = express.Router();

// Route to Create a new Thing
router.post('/', createThing);

// Route to Search All Things
router.get('/', async (request, response) => {
    try{
        const things= await Thing.find({});

        return response.status(200).send(things)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({error: error.message});
    }
})

// Route to Delete a Thing by Id
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const result = await Thing.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({message: error.message});
        }

        return response.status(200).send({ message: 'Oggetto eliminato con successo'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})

export default router;