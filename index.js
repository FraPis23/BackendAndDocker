import express from 'express';
import {PORT, mongoDBURL1} from "./config.js";
import mongoose from "mongoose";
import usersRoute from "./routes/usersRoute.js";
import warehousesRoute from "./routes/warehousesRoute.js";
import operationsRoute from "./routes/operationsRoute.js";
import thingsRoute from "./routes/thingsRoute.js";

const app = express();

app.use(express.json());

app.use('/user', usersRoute);

app.use('/warehouse', warehousesRoute);

app.use('/operation', operationsRoute);

app.use('/thing', thingsRoute);

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Backend");
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