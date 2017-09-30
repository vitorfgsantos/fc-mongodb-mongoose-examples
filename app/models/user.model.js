import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    basicInformation: {
        birthday: Date,
        name: String,
        gender: {
            type: String,
            required: true,
            enum: ['M', 'F']
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: [String],
    geolocationCoordinates: {
        type: [Number],
        required: false
    }
});

UserSchema.index({
    geolocationCoordinates: '2dsphere'
});

export default mongoose.model('User', UserSchema)
