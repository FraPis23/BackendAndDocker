import express from 'express';
import cors from "cors";
import {auth} from 'express-oauth2-jwt-bearer'

import userRoute from "./routes/userRoute.js";
import warehouseRoute from "./routes/warehouseRoute.js";
import thingRoute from "./routes/thingRoute.js";

import dotenv from "dotenv";
dotenv.config();

import {clearCache} from './utils/cache.js'
import {connectToDatabase} from "./utils/database.js";

const start = () => {
    const checkJwt = auth({
        audience: 'warehouse-certificate',
        issuerBaseURL: 'http://dev-8xr6cftsyhw0k2uw.us.auth0.com/',
        tokenSigningAlg: 'RS256'
    });

    const app = express();

    app.use(cors({
            origin: "http://localhost:3000",
            optionSuccessStatus: 200
        })
    );

    app.use(checkJwt);

    app.use(express.json());

    app.use('/api/users', userRoute);

    app.use('/api/warehouses', warehouseRoute);

    app.use('/api/things', thingRoute)

    const port = process.env.PORT;
    const host = process.env.HOST;
    app.listen(port, host, () => {
        console.log(`App listening at http://${host}:${port}`);
    });
}

setInterval(clearCache, 1000*60*60*24);
connectToDatabase(start);