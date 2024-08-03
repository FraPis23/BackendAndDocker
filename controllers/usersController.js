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

        if (!request.params) {
            return response.status(400).send({ error: "Devi fornire un ID per la ricerca" });
        }

        // Search by _id
        const user = await User.findById(request.params);

        if (!user) {
            return response.status(404).send({ error: "Utente non trovato" });
        }

        return response.status(200).send(user);

    } catch(error) {
        console.log(error);
        response.status(500).send({ error: error.message });
    }
};


export const searchUserByNameAndLastName = async (request, response) => {
    try {

        if (!request.query.name && !request.query.lastName) {
            return response.status(400).send({ error: "Fornire un nome e/o un cognome" });
        }

        let filter = {};
        if (request.query.name) {
            filter.name = new RegExp(request.query.name, 'i');
        }
        if (request.query.lastName) {
            filter.lastName = new RegExp(request.query.lastName, 'i');
        }

        const users = await User.find(filter);

        if (users.length === 0) {
            return response.status(404).send({ error: "Utente non trovato" });
        }

        return response.status(200).send(users);

    } catch (error) {
        console.error(error); // Usa console.error per loggare gli errori
        return response.status(500).send({ error: error.message });
    }
};


export const addWarehouseToList = async (request, response) => {
    try {

        const user = await User.findById(request.body.userId);
        if (!user) {
            return response.status(404).json({ error: "Utente non trovato" });
        }

        if (user.lsWarehousesId.includes(request.body.warehouseId)) {
            return response.status(400).json({ error: "Il magazzino esiste già" });
        }


        user.lsWarehousesId.push(request.body.warehouseId);
        await user.save();

        return response.status(201).send({ message: "Magazzino aggiunto con successo", user});

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
        return response.status(500).send({ error: error.message });
    }
};