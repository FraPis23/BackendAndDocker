import mongoose from 'mongoose';

class Warehouse {
    constructor(name, description, location, sub) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.lsThings = [];
        this.lsAdminsId = [sub];
        this.lsUsersId = [];
        this.lsOperations = [];
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

const warehouseModel = mongoose.model('Warehouse', warehouseSchema);

export {Warehouse, warehouseModel, warehouseSchema};