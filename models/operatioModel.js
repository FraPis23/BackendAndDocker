import mongoose from 'mongoose'

class Operation {
    constructor(date, thingName, quantity, userSub) {
        this.name = name;
        this.thingName = thingName;
        this.quantity = quantity;
        this.userSub = userSub;
    }
}

const operationSchema = new mongoose.Schema(
    {
        date:{
            type: Date,
            required:true
        },
        thingName: {
            type: String,
            required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        userSub: {
            type: String,
            required: true,
        }
    }
);

const operationModel = mongoose.model('Operation', operationSchema);
export {Operation, operationModel, operationSchema};