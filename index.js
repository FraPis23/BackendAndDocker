import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import {auth} from 'express-oauth2-jwt-bearer'

import {PORT, mongoDBURL, mongoDBURL1, mongoDBURL2, HOST} from "./config.js";

import userRoute from "./routes/userRoute.js";
import warehouseRoute from "./routes/warehouseRoute.js";
import thingRoute from "./routes/thingRoute.js";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    optionSuccessStatus: 200
})
);

const checkJwt = auth({
    audience: 'http://localhost:5555/api/auth0',
    issuerBaseURL: 'http://dev-8xr6cftsyhw0k2uw.us.auth0.com/',
});

app.use(express.json());

app.use('/api/users', checkJwt, userRoute);

app.use('/api/warehouses', checkJwt, warehouseRoute);

app.use('/api/things', checkJwt, thingRoute)

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Backend");
});

const startServer = async () => {
    try {
        await mongoose.connect(mongoDBURL1,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log("MongoDB Connesso");
        app.listen(PORT, HOST, () => {
            console.log(`App in ascolto all'indirizzo http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error("Errore durante la connessione a MongoDB:", error);
    }
};

startServer();