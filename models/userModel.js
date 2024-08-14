import mongoose from 'mongoose';

class User {
    constructor(picture, email, nickname, sub) {
        this.picture = picture;
        this.email = email;
        this.nickname = nickname;
        this.sub = sub;
        this.lsWarehousesId = [];
    }
}

const userSchema = new mongoose.Schema({
    picture: {
        type: String
    },
    email: {
        type: String
    },
    nickname: {
        type: String
    },
    sub: {
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

const userModel = mongoose.model('User', userSchema);

export {User, userModel, userSchema};