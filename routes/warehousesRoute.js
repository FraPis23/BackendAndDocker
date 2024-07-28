import express from 'express';
import {Warehouse} from "../models/warehouseModel.js";
import {User} from "../models/userModel.js";

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

// Route to Search All Warehouses
router.get('/', async (request, response) => {
    try{
        const warehouses = await Warehouse.find({});

        return response.status(200).send(warehouses)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({error: error.message});
    }
})

// Route to Search Users by Name
router.get('/name', async (request, response) => {
    try {
        const { name } = request.query;

        if (!name) {
            return response.status(400).send({ error: "Devi fornire almeno un nome per la ricerca" });
        }

        // Search Filter
        const searchCriteria = { name: new RegExp(name, 'i') }; // Cerca nome ignorando maiuscole e minuscole

        // Search
        const users = await User.find(searchCriteria);

        if (users.length === 0) {
            return response.status(404).send({ error: "Nessun utente trovato" });
        }

        return response.status(200).send(users);

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
});

// Route to Delete a Warehouse by Id
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const result = await Warehouse.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({message: error.message});
        }

        return response.status(200).send({ message: 'Magazzino eliminato con successo'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})

export default router;