import express from "express";
import { User } from "../models/userModel.js"
import {Warehouse} from "../models/warehouseModel.js";

const router = express.Router();

// Route to Create a new User
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.lastName
        ) {
            return response.status(400).send("Fornire i campi obbligatori");
        }
        const newUser = {
            name: request.body.name,
            lastName: request.body.lastName,
            idAuth0: request.body.idAuth0,
            lsWarehouses: undefined
        }

        const user = await User.create(newUser);

        return response.status(201).send(user);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
});

// Route to Search All Users
router.get('/', async (request, response) => {
    try{
        const users = await User.find({});

        return response.status(200).send(users)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({error: error.message});
    }
})

// Route to Search Users by Id
router.get('/:id', async (request, response) => {
    try {
        const userId = request.params.id;

        if (!userId) {
            return response.status(400).send({ error: "Devi fornire un ID per la ricerca" });
        }

        // Search by _id
        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).send({ error: "Utente non trovato" });
        }

        return response.status(200).send(user);

    } catch(error) {
        console.log(error);
        response.status(500).send({ error: error.message });
    }
});

// Route to Add Warehouse to WarehousesList
router.post('/add-warehouse', async (request, response) => {
    try {
        const { userId, warehouseData } = request.body;

        if (!userId || !warehouseData) {
            return response.status(400).send({ error: "Alcuni dati sono assenti" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).send({ error: "Utente non trovato" });
        }

        const warehouseExists = user.lsWarehouses.some(warehouse => warehouse._id.equals(warehouseData._id));

        if (warehouseExists) {
            return res.status(400).send({ error: "Il magazzino esiste già" });
        }

        const newWarehouse = new Warehouse(warehouseData);
        user.lsWarehouses.push(newWarehouse);

        await user.save();

        return res.status(201).send({ message: "Magazzino aggiunto con successo", warehouse: newWarehouse });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});

export default router;