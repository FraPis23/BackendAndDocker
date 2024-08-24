import mongoose from 'mongoose'

class Thing {
    constructor(name, quantity, minQuantity, picture) {
        this.name = name;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.picture = picture;
    }
}

const thingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0
    },
    minQuantity: {
        type: Number,
        default: 0
    },
    picture: {
        type: String,
    }
});

const thingModel = mongoose.model('Thing', thingSchema);
export {Thing, thingModel, thingSchema};