import { Warehouse } from "../models/warehouseModel.js";
import {Thing} from "../models/thingModel.js";
import {Operation} from "../models/operatioModel.js";
import {User} from "../models/userModel.js";
import {request, response} from "express";

export const createWarehouse = async (request, response) => {
    try{
        if(
            !request.body.name
        ) {
            return response.status(400).send("Assegnare il nome al magazzino");
        }
        const newWarehouse = {
            name: request.body.name,
            description: request.body.description ? request.body.description : undefined,
            location: request.body.location ? request.body.location : undefined,
            lsAdminsId: [request.body.userId]
        }

        const warehouse = await Warehouse.create(newWarehouse);

        return response.status(201).send(warehouse);

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}


export const createThing = async (request, response) => {
    try{
        if(!request.body.name) {
          return response.status(400).send("Assegnare il nome all'oggetto");
        }

        const newThing = {
            name: request.body.name,
            quantity: request.body.quantity ? request.body.quantity : undefined,
            minQuantity: request.body.minQuantity ? request.body.minQuantity : undefined
        }

        const thing = await Thing.create(newThing);

        const { id } = request.params;
        const warehouse = await Warehouse.findById(id);
        warehouse.lsThings.push(thing);
        await warehouse.save();

        return response.status(201).send(thing);

    }catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}


export const deleteThing = async (request, response) => {
    try {
        const { warehouseId, thingId } = request.params;

        if (!thingId) {
            return response.status(400).send({ error: "ID dell'oggetto non fornito" });
        }

        const warehouse = await Warehouse.findById(warehouseId);


        warehouse.lsThings.splice(warehouse.lsThings.indexOf(thingId), 1);

        await warehouse.save();

        return response.status(200).send({ message: "Oggetto eliminato con successo" });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
};


export const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ error: "ID del magazzino non fornito" });
        }

        const warehouse = await Warehouse.findByIdAndDelete(id);

        if (!warehouse) {
            return res.status(404).send({ error: "Magazzino non trovato" });
        }

        return res.status(200).send({ message: "Magazzino eliminato con successo" });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
};


export const createOperation = async (request, response) => {
    try{
        if(
            !request.body.warehouseId ||
            !request.body.lsThingsName ||
            !request.body.lsQuantity ||
            !request.body.userId
        ) {
            return response.status(400).send("Assegnare tutte le variabili dell'operazione");
        }

        const date = new Date();

        const newOperation = {
            date: date,
            lsThingsName: request.body.lsThingsName,
            lsQuantity: request.body.lsQuantity,
            userId: request.body.userId,
        }

        const operation = await Operation.create(newOperation);
        const warehouse = await Warehouse.findById(request.body.warehouseId);

        if (!warehouse) {
            return response.status(404).send({ error: "Magazzino non trovato" });
        }

        warehouse.lsOperations.push(operation);
        await warehouse.save();

        return response.status(201).send(operation);

    } catch(error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
};


export const deleteOperations = async (request, response) => {
    try {
        const { id } = request.params;

        if (!id) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const warehouse = await Warehouse.findById(id).populate('lsOperations');

        if (!warehouse) {
            return response.status(404).send("Magazzino non trovato");
        }

        const operationsToDelete = warehouse.lsOperations.filter(operation => new Date(operation.date) < thirtyDaysAgo);

        const operationIdsToDelete = operationsToDelete.map(operation => operation._id);

        warehouse.lsOperations = warehouse.lsOperations.filter(
            operationId => !operationIdsToDelete.includes(operationId)
        );

        await warehouse.save();

        await Operation.deleteMany({ _id: { $in: operationIdsToDelete } });

        return response.status(200).send({
            message: 'Operazioni eliminate con successo',
            deletedCount: operationIdsToDelete.length
        });

    } catch (error) {
        console.error(error);
        return response.status(500).send({ error: error.message });
    }
};


export const addUser = async (request, response) => {
    try{
        const { warehouseId, userId } = request.params;

        if (!warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }
        if (!userId) {
            return response.status(400).send("Assegnare ID dell'utente");
        }

        const warehouse = await Warehouse.findById(warehouseId);
        warehouse.lsUsersId.push(userId);
        await warehouse.save();

        return response.status(201).send({message: "Utente aggiunto al magazzino "});


    }catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
}


export const addAdmin = async (request, response) => {
    try{
        const { warehouseId, userId } = request.params;

        if (!warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }
        if (!userId) {
            return response.status(400).send("Assegnare ID dell'amministratore");
        }

        const warehouse = await Warehouse.findById(warehouseId);
        warehouse.lsAdminId.push(userId);
        await warehouse.save();

        return response.status(201).send({message: "Amministratore aggiunto al magazzino "});


    }catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
};


export const deleteUser = async (request, response) => {
    try{
        const { warehouseId, userId } = request.params;

        if (!warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }
        if (!userId) {
            return response.status(400).send("Assegnare ID dell'utente");
        }

        const warehouse = await Warehouse.findById(warehouseId);

        warehouse.lsThings.splice(warehouse.lsUsersId.indexOf(userId), 1);

        await warehouse.save();

        return response.status(200).send({ message: "Utente eliminato con successo" });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
}


export const deleteAdmin = async (request, response) => {
    try{
        const { warehouseId, userId } = request.params;

        if (!warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }
        if (!userId) {
            return response.status(400).send("Assegnare ID dell'amministratore");
        }

        const warehouse = await Warehouse.findById(warehouseId);

        warehouse.lsThings.splice(warehouse.lsAdminId.indexOf(userId), 1);

        await warehouse.save();

        return response.status(200).send({ message: "Amministratore eliminato con successo" });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
};


export const getWarehoseById = async (request, response) => {
    try {

        // it never should  happen
        if (!request.params.userId) {
            return response.status(400).send({ error: "Si sono verificati problemi con il suo Account" });
        }

        const warehouse = await Warehouse.findById(request.params.warehouseId);

        if(!warehouse)
        {
            return response.status(404).send({ error: "Non ci sono magazzini associati al tuo account" });
        }

        return response.status(200).send(warehouse);


    } catch(error){
        console.log(error);
        response.status(500).send({error: error.message})
    }
};


export const getThings = async (request, response) => {

    try {
        const {id} = request.params;

        if(!id)
        {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const warehose = Warehouse.findById(id);
        if(!warehose)
        {
            return response.status(400).send("Magazzino non trovato");
        }
        const lsThings = warehose.lsThings();
        return response.status(200).send(lsThings);
        

    }catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
};


export const getThingByName = async (request, response) => {

            try {
                if (!request.query.name) {
                    return response.status(400).send({ error: "Fornire un nome oggetto" });
                }

                let searchCriteria = {$regex: request.body.name, $options: 'i'};

                const things = await Thing.find(searchCriteria);

                if (things.length === 0) {
                    return response.status(404).send({ error: "Oggetto non trovato" });
                }

                return response.status(200).send(things);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
};

export const getUsers = async (request, response) => {
    try{
        const { id } = request.params;
        if(!id)
        {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const warehouse = await Warehouse.findById(id);
        if(!warehouse)
        {
            return response.status(400).send("Magazzino non trovato");
        }

        const lsUsers = await warehouse.lsUsersId;
        return response.status(200).send(lsUsers);
    } catch (error){
        console.log(error);
        return response.status(500).send({error: error.message});
    }
};


export const getAdmins = async (request, response) => {
    try{
        const { id } = request.params;
        if(!id)
        {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const warehouse = await Warehouse.findById(id);
        if(!warehouse)
        {
            return response.status(400).send("Magazzino non trovato");
        }

        const lsAdmins = await warehouse.lsAdminsId;
        return response.status(200).send(lsAdmins);
    } catch (error){
        console.log(error);
        return response.status(500).send({error: error.message});
    }
};

export const getOperations = async (request, response) => {
    try{
        const { id } = request.params;
        if(!id)
        {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const warehouse = await Warehouse.findById(id);
        if(!warehouse)
        {
            return response.status(400).send("Magazzino non trovato");
        }

        const lsOperations = await warehouse.lsOperations();
        return response.status(200).send(lsOperations);
        
    }catch (error){
        console.log(error);
        return response.status(500).send({error: error.message});
    }
};
