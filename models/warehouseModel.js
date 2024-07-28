import mongoose from 'mongoose';
import {Operation, OperationSchema} from "./operatioModel.js";
import {Thing, ThingSchema} from "./thingModel.js";

const WarehouseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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
        type: [ThingSchema],
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
        type: [OperationSchema],
        required: true,
        default: []
    }
});

export const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
export { WarehouseSchema };
