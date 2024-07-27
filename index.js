import express from 'express';
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Warehouse} from "./models/warehouseModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Backend");
})

app.post('/warehouse', async (request, response) => {
    try{
        if(
            !request.body.name
        ) {
            return response.status(400).send("Assegnare almeno il nome al magazzino");
        }
        const newWarehouse = {
            name: request.body.name,
            description: request.body.description,
            location: request.body.location,
            lsAdmins: [request.body.user],
            lsUsers: request.body.lsUsers,
            lsThings: request.body.lsThings,
            lsOperations: []
        }

        const warehouse = await Warehouse.create(newWarehouse);

        return response.status(201).send(warehouse);

    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("MongoDB Connesso");
        app.listen(PORT, () => {
            console.log(`App in ascolto alla porta: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })