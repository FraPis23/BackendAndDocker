import mongoose from 'mongoose'
import {ThingSchema} from "./thingModel.js";

const OperationSchema = mongoose.Schema(
    {
        date:{
            type: Date,
            required:true
        },
        lsThings: {
            type: [ThingSchema],
            required: true,
        },
        lsQuantity: {
          type: [Number],
          required: true,
        },
        userId: {
            type: String,
            required: true,
        }
    }
);

export const Operation = mongoose.model('Operation', OperationSchema);
export {OperationSchema};