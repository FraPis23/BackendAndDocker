import express from 'express';
import {Warehouse} from "../models/warehouseModel.js";

const router = express.Router();

// Route to Create a new Warehouse
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.name
        ) {
            return response.status(400).send("Assegnare almeno il nome al magazzino");
        }
        const newWarehouse = {
            name: request.body.name,
            description: request.body.description ? request.body.description : undefined,
            location: request.body.location ? request.body.location : undefined,
            lsAdminsId: [request.body.user],
            lsUsersId: undefined,
            lsThings: undefined,
            lsOperations: undefined
        }

        const warehouse = await Warehouse.create(newWarehouse);

        return response.status(201).send(warehouse);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
});

export default router;