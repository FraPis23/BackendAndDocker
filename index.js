import express from 'express';
import {PORT, mongoDBURL1} from "./config.js";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import warehouseRoute from "./routes/warehouseRoute.js";
import operationRoute from "./routes/operationRoute.js";
import thingRoute from "./routes/thingRoute.js";

const app = express();

app.use(express.json());

app.use('/users', userRoute);

app.use('/warehouses', warehouseRoute);

app.use('/operations', operationRoute);

app.use('/things', thingRoute);

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