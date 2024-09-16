import {Server} from "socket.io";

export const initializeSocket = (/*server*/) => {

    const io = new Server({
        cors: {
            origin: "http://localhost:5555"
        }
    });

    io.listen(4000);

    io.on('connection', (socket) => {

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

        socket.on('modifiedQuantity', (data) => {
            const {warehouseId} = data;
            io.to(warehouseId).emit('modifyQuantity', data);
        })

        socket.on('joinWarehouse', (warehouseId) => {
            socket.join(warehouseId);
        });

        socket.on('leaveWarehouse', (warehouseId) => {
            socket.leave(warehouseId);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}