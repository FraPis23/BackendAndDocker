import mongoose from 'mongoose';

class Warehouse {
    constructor(name, description, coordinates, lsAdminsId, lsUSersId, icon) {
        this.name = name;
        this.description = description;
        this.coordinates = coordinates;
        this.lsThings = [];
        this.lsAdminsId = lsAdminsId;
        this.lsUsersId = lsUSersId;
        this.lsOperations = [];
        this.icon = icon;
    }
}

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    coordinates: {
        type: [Number],
        default: []
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
    },
    icon: {
        type: Number,
        required: false
    }
});

const warehouseModel = mongoose.model('Warehouse', warehouseSchema);

export {Warehouse, warehouseModel, warehouseSchema};