import { Schema, model, connect, Types } from 'mongoose';
export interface IAccount {

    email?: string;
    password?: string;
    role?: string;
}

const schema = new Schema<IAccount>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Types.ObjectId, ref: 'Role' }
}, { timestamps: true });

export default model<IAccount>('Account', schema);