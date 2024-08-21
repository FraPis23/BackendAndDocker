import {warehouseModel} from "../models/warehouseModel.js";
import {searchUser, getSubByNickname} from "./usersController.js";
import {Thing} from "../models/thingModel.js";
import {Operation} from "../models/operatioModel.js";

//IN USO
// Add new Warehouse
async function add(warehouse) {
    const newWarehouse = new warehouseModel(warehouse);
    await newWarehouse.save();
    return newWarehouse;
}
export const addWarehouse = async (request, response) => {
    try {
        const lsAdminsId = [];
        const lsUsersId = [];

        lsAdminsId.push(request.body.sub);

        request.body.lsAdminsNickname.forEach((nickname) => {
            getSubByNickname(nickname)
                .then((sub) => {
                    lsAdminsId.push(sub);
                })
        });

        request.body.lsUsersNickname.forEach((nickname) => {
            getSubByNickname(nickname)
                .then((sub) => {
                    lsUsersId.push(sub)
                })
        })

        const warehouse = {
            name: request.body.name,
            description: request.body.description,
            coordinates: request.body.coordinates,
            lsAdminsId: lsAdminsId,
            laUsersId: lsUsersId,
            icon: request.body.icon
        }
        const newWarehouse = await add(warehouse);

        newWarehouse.lsAdminsId.forEach( (adminId) => {
            searchUser(adminId).then(async (admin ) => {
                console.log("admin", admin);
                admin.lsWarehousesId.push(newWarehouse._id);
                await admin.save();
            })

        })

        newWarehouse.lsUsersId.forEach((userId) => {
            const user = searchUser(userId);
            user.lsWarehousesId.push(newWarehouse._id);
        })

        response.status(200).send("Ok");

    } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
}


export const getWarehoseById = async (request, response) => {
    try {

        const {id} = request.params;

        const warehouse = await warehouseModel.findById(id);

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


// DA TESTARE
/*
export const deleteWarehouse = async (request, response) => {
    try {
        const { id } = request.params;

        if (!id) {
            return response.status(400).send({ error: "ID del magazzino non fornito" });
        }

        const warehouse = await Warehouse.findByIdAndDelete(id);

        if (!warehouse) {
            return response.status(404).send({ error: "Magazzino non trovato" });
        }

        return response.status(200).send({ message: "Magazzino eliminato con successo" });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
};


export const createThing = async (request, response) => {

    try{

        if (!request.body.thingId || !request.body.warehouseId) {
            return response.send(400).message("Mancano i riferimenti necessari per l'assegnazione");
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);



        if(warehouse.lsThings.includes(request.body.thingId))
        {
            return response.status(401).send("Oggetto già presente ");
        }

        const thing = await Thing.findById(request.body.thingId);
        warehouse.lsThings.push(thing);
        warehouse.save();

        return response.status(201).send({message:"Oggetto aggiunto con successo", thing, warehouse});

    } catch (error) {
        console.log(error);
        return response.status(500).json({error: error.message});
    }
};


export const deleteThing = async (request, response) => {
    try {

        if (!request.body.thingId || !request.body.warehouseId) {
            return response.status(400).send({ error: "Fornire prerequisiti eseguire l'operazione" });
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);
        warehouse.lsThings.splice(warehouse.lsThings.indexOf(request.body.thingId), 1);
        await warehouse.save();

        return response.status(200).send({ message: "Oggetto eliminato con successo" });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
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

        if (!request.body.warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const warehouse = await Warehouse.findById(request.body.warehouseId).populate('lsOperations');

        if (!warehouse) {
            return response.status(404).send("Magazzino non trovato");
        }

        const operationsToDelete = warehouse.lsOperations.filter(operation => new Date(operation.date) < thirtyDaysAgo);

        const operationIdsToDelete = operationsToDelete.map(operation => operation._id);

        await Operation.deleteMany({ _id: { $in: operationIdsToDelete } });

        warehouse.lsOperations = warehouse.lsOperations.filter(
            operation => !operationIdsToDelete.includes(operation._id)
        );

        await warehouse.save();


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

        if (!request.body.warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }
        if (!request.body.userId) {
            return response.status(400).send("Assegnare ID dell'utente");
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);
        warehouse.lsUsersId.push(request.body.userId);
        await warehouse.save();

        return response.status(201).send({message: "Utente aggiunto al magazzino "});


    }catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
}


export const addAdmin = async (request, response) => {
    try{

        if (!request.body.warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }
        if (!request.body.userId) {
            return response.status(400).send("Assegnare ID dell'amministratore");
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);
        warehouse.lsAdminId.push(request.body.userId);
        await warehouse.save();

        return response.status(201).send({message: "Amministratore aggiunto al magazzino "});


    }catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
};


export const deleteUser = async (request, response) => {
    try{

        if (!request.body.warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }
        if (!request.body.userId) {
            return response.status(400).send("Assegnare ID dell'utente");
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);

        warehouse.lsUsersId.splice(warehouse.lsUsersId.indexOf(request.body.userId), 1);

        await warehouse.save();

        return response.status(200).send({ message: "Utente eliminato con successo" });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
}


export const deleteAdmin = async (request, response) => {
    try{


        if (!request.body.warehouseId) {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }
        if (!request.body.userId) {
            return response.status(400).send("Assegnare ID dell'amministratore");
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);

        warehouse.lsAdminId.splice(warehouse.lsAdminId.indexOf(request.body.userId), 1);

        await warehouse.save();

        return response.status(200).send({ message: "Amministratore eliminato con successo" });

    } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
    }
};


export const getThings = async (request, response) => {

    try {
        const {id} = request.params;

        if(!id)
        {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const warehouse = Warehouse.findById(id);
        if(!warehouse)
        {
            return response.status(400).send("Magazzino non trovato");
        }
        const lsThings = warehouse.lsThings();
        return response.status(200).send(lsThings);


    }catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
};

// Da rivedere
export const getThingByName = async (request, response) => {

            try {

                if (!request.query.name) {
                    return response.status(400).send({ error: "Fornire un nome oggetto" });
                }
                if (!request.query.warehouseId){
                    return response.status(400).send({ error: "Assegnare ID del magazzino" });
                }

                const filter = { name: new RegExp(request.query.name, 'i') };

                const warehouse = await Warehouse.findById(request.query.warehouseId).populate('lsThings');

                if (!warehouse) {
                    return response.status(404).send({ error: "Magazzino non trovato" });
                }

                const things = warehouse.lsThings.filter(thing => filter.name.test(thing.name));

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
        if(!request.body.warehouseId)
        {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);
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

        if(!request.body.warehouseId)
        {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);
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

        if(!request.body.warehouseId)
        {
            return response.status(400).send("Assegnare l'ID del magazzino");
        }

        const warehouse = await Warehouse.findById(request.body.warehouseId);
        if(!warehouse)
        {
            return response.status(400).send("Magazzino non trovato");
        }

        const lsOperations = await warehouse.lsOperations;
        return response.status(200).send(lsOperations);

    }catch (error){
        console.log(error);
        return response.status(500).send({error: error.message});
    }
};
*/