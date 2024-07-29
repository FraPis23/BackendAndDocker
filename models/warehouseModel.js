import mongoose from 'mongoose';

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
    lsThingsId: {
        type: [String],
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
    lsOperationsId: {
        type: [String],
        required: true,
        default: []
    }
});

export const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
