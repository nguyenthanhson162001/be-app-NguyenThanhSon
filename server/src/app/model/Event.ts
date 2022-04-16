
import { Schema, model, connect, Types, plugin } from 'mongoose';



export interface Event {
    eventName?: string;
    slug: string
}

const schema = new Schema<Event>({
    eventName: { type: String, required: true },
});

export default model<Event>('Event', schema);