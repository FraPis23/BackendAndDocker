import { Warehouse } from "../models/warehouseModel.js";
import {Thing} from "../models/thingModel.js";

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

// Creazione ecancella<ione oggetto in magazzino
//Crea oggetto operazione
//CAmbio organizzazione personale magazzino

export const getWarehoseById = async (request, response) => {
    try {

        // it never should  happen
        if (!request.params.userId) {
            return response.status(400).send({ error: "Si sono verificati problemi con il suo Account" });
        }

        const warehouse = await Warehouse.findById(request.params.warehouseId);
        return response.status(200).send(warehouse);

        if(!warehouse)
        {
            return response.status(404).send({ error: "Non ci sono magazzini associati al tuo account" });
        }


    } catch(error){
        console.log(error);
        response.status(500).send({error: error.message})
    }
};


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