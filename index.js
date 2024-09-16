import express from 'express';
import cors from "cors";
import {auth} from 'express-oauth2-jwt-bearer'
import path from "path";

import userRoute from "./routes/userRoute.js";
import warehouseRoute from "./routes/warehouseRoute.js";
import thingRoute from "./routes/thingRoute.js";

import dotenv from "dotenv";
dotenv.config();

import {initializeSocket} from "./utils/socket.js";
import {connectToDatabase} from "./utils/database.js";

const start = () => {
    const checkJwt = auth({
        audience: 'warehouse-certificate',
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        tokenSigningAlg: 'RS256'
    });

    const app = express();

    app.use(express.static(path.join('./build')));

    app.use(cors({
            origin: ["http://localhost:3000"],
            credentials: true
        })
    );

    //const server = http.createServer(app);

    initializeSocket(/*server*/);

    app.use(checkJwt);

    app.use(express.json());

    app.use('/api/users', userRoute);

    app.use('/api/warehouses', warehouseRoute);

    app.use('/api/things', thingRoute)

    app.get('*', (req, res) => {
        res.sendFile(path.join('./build', 'index.html'));
    });

    const port = process.env.PORT;
    const host = process.env.HOST;
    app.listen(port, host, () => {
        console.log(`App listening at http://${host}:${port}`);
    });
}

connectToDatabase(start);