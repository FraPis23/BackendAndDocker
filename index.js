import express from 'express';
import cors from "cors";
import {auth} from 'express-oauth2-jwt-bearer'

import userRoute from "./routes/userRoute.js";
import warehouseRoute from "./routes/warehouseRoute.js";
import thingRoute from "./routes/thingRoute.js";

import dotenv from "dotenv";
dotenv.config();

import {Server} from "socket.io";

import {clearCache} from './utils/cache.js'
import {connectToDatabase} from "./utils/database.js";

const start = () => {
    const checkJwt = auth({
        audience: 'warehouse-certificate',
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        tokenSigningAlg: 'RS256'
    });

    const app = express();

    app.use(cors({
            origin: "http://localhost:3000",
            credentials: true
        })
    );

    const io = new Server({
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.listen(4000);

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('deleteUser', (data) => {
            const {warehouseId} = data;
            io.to(warehouseId).emit('userDeleted', data);
        });

        socket.on('modifyPermissions', (data) => {
            const {warehouseId} = data;
            io.to(warehouseId).emit('modifyPermissions', data);
        })

        socket.on('addUser', (data) => {
            const {warehouseId} = data;
            io.to(warehouseId).emit('addUser', data);
        })

        socket.on('deleteUser', (data) => {
            const {warehouseId} = data;
            io.to(warehouseId).emit('deleteUser', data);
        })

        socket.on('joinWarehouse', (warehouseId) => {
            socket.join(warehouseId);
            console.log(`Client joined warehouse: ${warehouseId}`);
        });

        socket.on('leaveWarehouse', (warehouseId) => {
            socket.leave(warehouseId);
            console.log(`Client left warehouse: ${warehouseId}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

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