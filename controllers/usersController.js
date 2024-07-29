import { User } from '../models/userModel.js'

export const createUser = async (request, response) => {
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
};

export const searchAllUsers = async (request, response) => {
    try {
        const users = await User.find({});

        return response.status(200).send(users)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({error: error.message});
    }
};

export const searchUserById = async (request, response) => {
    try {

        if (!request.params.userId) {
            return response.status(400).send({ error: "Devi fornire un ID per la ricerca" });
        }

        // Search by _id
        const user = await User.findById(request.params.userId);

        if (!user) {
            return response.status(404).send({ error: "Utente non trovato" });
        }

        return response.status(200).send(user);

    } catch(error) {
        console.log(error);
        response.status(500).send({ error: error.message });
    }
};

export const addWarehouseToList = async (request, response) => {
    try {

        const user = await User.findById(request.body.userId);

        if (user.lsWarehousesId.some(warehouseId => warehouseId.equals(request.body.warehouseId))) {
            return response.status(400).send({ error: "Il magazzino esiste già" });
        }

        user.lsWarehousesId.push(request.body.warehouseId);
        await user.save();
        return response.status(201).send({ message: "Magazzino aggiunto con successo", warehouse: newWarehouse });

    } catch (error) {
        console.log(error);
        response.status(500).send({ error: error.message });
    }
};

export const deleteWarehouseFromList = async (request, response) => {
    try {

        const user = await User.findById(request.body.userId);
        user.lsWarehousesId.splice(user.lsWarehousesId.indexOf(request.body.warehouseId), 1);
        await user.save();
        return response.status(200).send({ message: "Magazzino rimosso con successo" });

    } catch (error) {
        console.log(error);
        response.status(500).send({ error: error.message });
    }
};