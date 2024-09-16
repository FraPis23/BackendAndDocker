import express from 'express';
import cors from "cors";
import {auth} from 'express-oauth2-jwt-bearer'
import path from "path";
import {fileURLToPath} from 'url'
import http from "http";

import userRoute from "./routes/userRoute.js";
import warehouseRoute from "./routes/warehouseRoute.js";
import thingRoute from "./routes/thingRoute.js";

import dotenv from "dotenv";
dotenv.config();

import {initializeSocket} from "./utils/socket.js";
import {connectToDatabase} from "./utils/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const start = () => {
    const checkJwt = auth({
        audience: 'warehouse-certificate',
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        tokenSigningAlg: 'RS256'
    });

    const app = express();


    app.use(cors({origin: '*'}));

    app.use(express.static(path.join(__dirname, './build')));
    initializeSocket(/*server*/);
    app.use(express.json());

    app.use('/api/users', checkJwt, userRoute);

    app.use('/api/warehouses',checkJwt, warehouseRoute);

    app.use('/api/things', thingRoute)

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './build', 'index.html'));
    });

    const port = process.env.PORT;
    const host = process.env.HOST;
    app.listen(port, host, () => {
        console.log(`App listening at http://${host}:${port}`);
    });
}

connectToDatabase(start);