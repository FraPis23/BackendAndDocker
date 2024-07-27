import mongoose from 'mongoose';
import {Warehouse} from "./warehouseModel.js";

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
        type: [Warehouse],
        required: true,
        default: []
    }
});

export const User = mongoose.model('User', UserSchema);
