import mongoose from 'mongoose'

const ThingSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }
);

export const Thing = mongoose.model('Thing', ThingSchema);
export {ThingSchema};