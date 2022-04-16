import { Schema, model, connect, Types } from 'mongoose';
export interface IUser {

  lastName?: string;
  firstName?: string;
  email?: string;
  hobbies: string;
  worlkLocation: string;
  eventId?: string
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({

  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hobbies: { type: String, required: false },
  worlkLocation: { type: String, required: false },
  eventId: { type: Types.ObjectId, ref: 'Event' }
}, { timestamps: true });
export default model<IUser>('User', userSchema);