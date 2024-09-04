import {Server} from "socket.io";

export const initializeSocket = (/*server*/) => {

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

        socket.on('deleteWarehouse', (data) => {
            const {warehouseId} = data;
            io.to(warehouseId).emit('deleteWarehouse');
        })

        socket.on('addThing', (data) => {
            const {warehouseId} = data;
            io.to(warehouseId).emit('addThing', data);
        })

        socket.on('deletedThing', (data) => {
            const {warehouseId} = data;
            io.to(warehouseId).emit('deleteThing', data);
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
}