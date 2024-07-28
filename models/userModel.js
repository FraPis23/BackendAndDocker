import mongoose from 'mongoose';
import {WarehouseSchema} from "./warehouseModel.js";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    idAuth0: {
        type: String,
        required: true,
        unique: true
    },
    lsWarehouses: {
        type: [WarehouseSchema],
        required: true,
        default: []
    }
});

export const User = mongoose.model('User', UserSchema);
export {UserSchema};
