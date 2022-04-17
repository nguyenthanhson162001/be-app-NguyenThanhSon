import { Schema, model, connect, Types } from 'mongoose';
export interface IRole {
    _id: string;
    roleName?: string;
}

const schema = new Schema<IRole>({
    roleName: { type: String, required: true },
});

export default model<IRole>('Role', schema);