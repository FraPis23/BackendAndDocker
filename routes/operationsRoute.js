import express from "express";
import {Operation} from "../models/operatioModel.js";
import {User} from "../models/userModel.js";

const router = express.Router();

// Route to Create a new Operation
router.post('/', async (request, response) => {
    try {
        if (
            request.body.lsThings.length === 0
        ) {
            return response.status(400).send("Nessun elemento aggiunto o prelevato");
        }
        const newOperation = {
            date: request.body.date,
            lsThings: request.body.lsThings,
            lsQuantity: request.body.lsQuantity,
            userId: request.body.userId
        }

        const operation = await Operation.create(newOperation);

        return response.status(201).send(operation);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
});

// Route to Search All Operations
router.get('/', async (request, response) => {
    try{
        const operations = await Operation.find({});

        return response.status(200).send(operations)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({error: error.message});
    }
})

export default router;