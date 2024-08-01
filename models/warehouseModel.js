import mongoose from 'mongoose';
import {OperationSchema} from "./operatioModel.js";
import {ThingSchema} from "./thingModel.js";

const WarehouseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: []
        }
    },
    lsThings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thing'
        }],
        required: true,
        default: []
    },
    lsAdminsId: {
        type: [String],
        required: true
    },
    lsUsersId: {
        type: [String],
        required: true,
        default: []
    },
    lsOperations: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Operation'
        }],
        required: true,
        default: []
    }
});

export const Warehouse = mongoose.model('Warehouse', WarehouseSchema);