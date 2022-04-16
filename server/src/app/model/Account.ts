import { Schema, model, connect, Types } from 'mongoose';
import { Role } from './Role';
export interface Account {

    email?: string;
    password?: string;
    role?: string;
}

const schema = new Schema<Account>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Types.ObjectId, ref: 'Role' }
}, { timestamps: true });

export default model<Account>('Account', schema);