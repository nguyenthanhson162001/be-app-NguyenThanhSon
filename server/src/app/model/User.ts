import { Schema, model, Types, Document } from 'mongoose';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
export type IUser = Document & {
  _id: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  hobbies: string;
  workLocation: string;
  eventId?: string[]
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({

  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  hobbies: { type: String, required: false },
  workLocation: { type: String, required: false },
  eventId: [{ type: Types.ObjectId, ref: 'Event' }]
}, { timestamps: true });

userSchema.plugin(mongoosePagination);

export default model<IUser, Pagination<IUser>>('User', userSchema) as Pagination<IUser>;