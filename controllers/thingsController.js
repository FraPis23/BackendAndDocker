import { Thing } from '../models/thingModel.js';


export const createThing = async (request, response) => {

    try{
        const newThing = new Thing({
            name: request.body.name,
            quantity: request.body.quantity ? request.body.quantity : undefined,
            minQuantity: request.body.minQuantity ? request.body.minQuantity : undefined
        })

        const thing = await Thing.create(newThing);

        return response.status(201).send(thing);

    }catch (error){
        console.log(error);
        return response.status(500).send({error:error.message})
    }
};




/*export const getThingById = async (request, response) => {

    try {

        const { id } = request.params;

        if(!id){
            return response.status(400).send("Nessun Id assegnato per l'operazione")
        }

        const thing = await Thing.findById(id);

        return response.status(201).send(thing);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
}*/

export const deleteThing = async (request, response) => {
    try{

        if(!request.body.thingId){
            return response.status(400).send("Nessun Id assegnato per l'operazione")
        }

        const thing = await Thing.findByIdAndDelete(request.params.thingId);

        return response.status(201).send("Oggetto rimosso");

    }catch (error){
        console.log(error);
        return response.status(500).send({error:error.message})
    }
};

export const updateThingDetails = async (request, response) => {
    try {

        if(!request.body.thingId) {
            return response.status(400).send("Nessun Id assegnato per l'operazione")
        }

        if (
            !request.body.name &&
            !request.body.minQuantity
        ) {
            return response.status(400).send("Nessun dato modificato");
        }

        const thing = await Thing.findById(request.body.thingId);

        if(request.body.name){
            thing.name = request.body.name
        }

        if(request.body.minQuantity){
            thing.minQuantity = request.body.minQuantity;
        }

        thing.save();

        return response.status(201).send(thing);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message})
    }
};

export const addThingQuantity = async (request, response) => {
    try {

        if(!request.body.thingId) {
            return response.status(400).send("Nessun Id assegnato per l'operazione")
        }

        if (
            !request.body.quantity
        ) {
            return response.status(400).send("Nessun dato modificato");
        }

        const thing = await Thing.findById(request.body.thingId);

        thing.quantity = thing.quantity + request.body.quantity;
        thing.save();

        return response.status(201).send(thing);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message})
    }
};

export const deductThingQuantity = async (request, response) => {
    try {

        if(!request.body.thingId) {
            return response.status(400).send("Nessun Id assegnato per l'operazione")
        }

        if (
            !request.body.quantity
        ) {
            return response.status(400).send("Nessun dato modificato");
        }

        const thing = await Thing.findById(request.body.thingId);

        thing.quantity = thing.quantity - request.body.quantity;
        thing.save();

        return response.status(201).send(thing);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message})
    }
};