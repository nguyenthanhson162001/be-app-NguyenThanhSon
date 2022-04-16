import { Schema, model, connect, Types } from 'mongoose';
export interface Role {

    roleName?: string;
}

const schema = new Schema<Role>({
    roleName: { type: String, required: true },
});

export default model<Role>('Role', schema);