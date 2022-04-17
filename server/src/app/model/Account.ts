import { Schema, model } from 'mongoose';
export interface IAccount {
    _id: string,
    email?: string;
    password?: string;
    role: string;
}
const schema = new Schema<IAccount>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String }
}, { timestamps: true });

export default model<IAccount>('Account', schema);