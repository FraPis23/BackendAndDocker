import express from "express";
import { User } from "../models/userModel.js"

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

// Route to Search Users by Name and/or LastName
router.get('/name-lastName', async (request, response) => {
    try {
        const { name, lastName } = request.query;

        if (!name && !lastName) {
            return response.status(400).send({ error: "Devi fornire almeno un nome o un cognome per la ricerca" });
        }

        // Search Filter
        let searchCriteria = {};
        if (name) {
            searchCriteria.name = new RegExp(name, 'i'); // Search by name
        }
        if (lastName) {
            searchCriteria.lastName = new RegExp(lastName, 'i'); // Search by lastName
        }

        // Search
        const users = await User.find(searchCriteria);

        if (users.length === 0) {
            return response.status(404).send({ error: "Nessun utente trovato" });
        }

        return response.status(200).send(users);

    } catch(error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
});

export default router;