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

export default router;