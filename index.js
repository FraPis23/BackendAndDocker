import express from 'express';
import {PORT, mongoDBURL1} from "./config.js";
import mongoose from "mongoose";
import {Warehouse} from "./models/warehouseModel.js";
import req from "express/lib/request.js";
import {User} from "./models/userModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Backend");
})


// User Post
app.post('/user', async (request, response) => {
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

//Warehouse Post
app.post('/warehouse', async (request, response) => {
    try{
        if(
            !request.body.name
        ) {
            return response.status(400).send("Assegnare almeno il nome al magazzino");
        }
        const newWarehouse = {
            name: request.body.name,
            description: request.body.description ? request.body.description : undefined,
            location: request.body.location ? request.body.location : undefined,
            lsAdminsId: [request.body.user],
            lsUsersId: undefined,
            lsThings: undefined,
            lsOperations: undefined
        }

        const warehouse = await Warehouse.create(newWarehouse);

        return response.status(201).send(warehouse);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
});

//Operation Post
app.post('/operation', async (request, response) => {
    try {
        if (
            request.body.lsThings.length === 0
        ) {
            return response.status(400).send("Nessun elemento aggiunto o prelevato");
        }
        const newOperation = {
            date: request.body.date,
            lsThings: request.body.lsThings,
            lsQuantity: request.body.lsQuantity,
            userId: request.body.userId
        }

        const operation = await User.create(newOperation);

        return response.status(201).send(operation);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
});

//Thing Post
app.post('/thing', async (request, response) => {
    try {
        if (
            !request.body.name
        ) {
            return response.status(400).send("Fornire il nome dell'oggetto");
        }
        const newUser = {
            name: request.body.name,
            quantity: request.body.quantity ? request.body.quantity : undefined,
        }

        const user = await User.create(newUser);

        return response.status(201).send(user);

    } catch (error) {
        console.log(error);
        return response.status(500).send({error: error.message});
    }
});

mongoose
    .connect(mongoDBURL1)
    .then(() => {
        console.log("MongoDB Connesso");
        app.listen(PORT, () => {
            console.log(`App in ascolto alla porta: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })