import { Thing } from '../models/thingModel.js';


export const createThing = async (request, ressponse) => {

    try{
        const createThing = new Thing({
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

export const getThingById = async (request, response) => {

    try {
        if(!request.body.id){
            return response.status(400).send("Nessun Id assegnato per l'operazione")
        }

        const thing = await Thing.findById(request.params.id);

        return response.status(201).send(thing);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
}

export const deleteThing = async (request, resposnse) => {
    try{

    }catch (error){
        console.log(error);
        return resposnse.status(500).send({error:error.message})
    }
};

export const updateThingDetails = async (request, resposnse) => {
    try {
        if(!request.body.thingId) {
            return response.status(400).send("Nessun Id assegnato per l'operazione")
        }

        if (
            !request.body.name &&
            !request.body.minQuantity
        ) {
            return resposnse.status(400).send("Nessun dato modificato");
        }

        let update = {};

        if(request.body.name){
            update.name = request.body.name
        }

        if(request.body.minQuantity){
            update.minQuantity = request.body.minQuantity;
        }

        const thing = await Thing.findByIdAndUpdate(request.params.thingId, update);
        thing.save();

        return response.status(201).send(thing);

    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message})
    }
};

export const updateThingQuantity = async (request, resposnse) => {}