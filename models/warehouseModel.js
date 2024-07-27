import mongoose from 'mongoose'
import {Thing} from "./thingModel.js";
import {User} from "./userModel.js";
import {Operation} from "./operatioModel.js";


const WarehouseSchema = mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        default: ''
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            default: undefined
        }
    },
    lsThings: {
        type: [Thing],
        required: true,
        default: []
    },
    lsAdmins:{
        type: [User],
        required: true
    },
    lsUsers: {
        type: [User],
        required: true,
        default: []
    },
    lsOperations: {
        type: [Operation],
        required: true,
        default: []
    }
});

export const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
export {WarehouseSchema};