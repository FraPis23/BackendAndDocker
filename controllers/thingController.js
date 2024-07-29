import { Thing } from "../models/thingModel.js";

export const createThing = async (request, response) => {
    try {
        if (
            !request.body.name
        ) {
            return response.status(400).send("Fornire i campi obbligatori");
        }
        const newThing = {
            name: request.body.name,
            quantity: request.body.quantity ? request.body.quantity : undefined,
            minQuantity: request.body.minQuantity ? request.body.minQuantity : undefined,
        }

        const thing = await Thing.create(newThing);

        return response.status(201).send(thing);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
};
