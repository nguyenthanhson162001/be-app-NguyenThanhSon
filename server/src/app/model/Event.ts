
import { Schema, model, connect, Types } from 'mongoose';
export interface Event {
    eventName?: string;
}

const schema = new Schema<Event>({
    eventName: { type: String, required: true },
});

export default model<Event>('Event', schema);