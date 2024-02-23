import { model, Schema, Document } from 'mongoose';

export interface UserModelInterface {
    _id?: string;
    email: string;
    fullName: string;
    userName: string;
    password: string;
    confirmedHash: string;
    confirmed: boolean;
    location?: string;
    about?: string;
    website?: string;
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema(
    {
        email: {
            unique: true,
            required: true,
            type: String,
        },
        fullName: {
            required: true,
            type: String,
        },
        userName: {
            unique: true,
            min: 3,
            max: 30,
            required: true,
            type: String,
        },
        avatarUrl: {
            type: String,
        },
        password: {
            required: true,
            min: 5,
            max: 50,
            type: String,
        },
        confirmedHash: {
            required: true,
            type: String,
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        location: String,
        about: String,
        website: String,
    },
    {
        timestamps: true,
    }
);

UserSchema.set('toJSON', {
    transform: (_, obj) => {
        delete obj.password, delete obj.confirmedHash;
        return obj;
    },
});

export const UserModel = model('User', UserSchema);
