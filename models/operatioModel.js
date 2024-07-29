import mongoose from 'mongoose'

const OperationSchema = mongoose.Schema(
    {
        date:{
            type: Date,
            required:true
        },
        lsThingsName: {
            type: [String],
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
export { OperationSchema };