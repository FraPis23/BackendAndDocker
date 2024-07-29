import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    idAuth0: {
        type: String,
        required: true,
        unique: true
    },
    lsWarehousesId: {
        type: [String],
        required: true,
        default: []
    }
});

export const User = mongoose.model('User', UserSchema);
