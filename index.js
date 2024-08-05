import express from 'express';
import {PORT, mongoDBURL, mongoDBURL1, mongoDBURL2} from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import warehouseRoute from "./routes/warehouseRoute.js";
import thingRoute from "./routes/thingRoute.js";


const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    optionSuccessStatus: 200
})
);
app.use(express.json());

app.use('/api/users', userRoute);

app.use('/api/warehouses', warehouseRoute);

app.use('/api/things', thingRoute)

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