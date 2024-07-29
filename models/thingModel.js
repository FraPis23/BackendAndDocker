import mongoose from 'mongoose'

const ThingSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        }
    }
);

export const Thing = mongoose.model('Thing', ThingSchema);