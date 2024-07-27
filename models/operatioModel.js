import mongoose from 'mongoose'
import {Thing} from "./thingModel.js";
import {User} from "./userModel.js"

const OperationSchema = mongoose.Schema(
    {
        date:{
            type: Date,
            required:true
        },
        lsThings: {
            type: [Thing],
            required: true,
        },
        User: {
            type: [User],
            required: true,
        }
    }
);

export const Operation = mongoose.model('Operation', OperationSchema);
export {OperationSchema};