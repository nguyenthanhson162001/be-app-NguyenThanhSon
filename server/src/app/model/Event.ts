
import { Schema, model, connect, Types, plugin } from 'mongoose';
import slug from 'mongoose-slug-hero'


export interface IEvent {
    _id: string;
    eventName?: string;
    slug: string
}

const schema = new Schema<IEvent>({
    eventName: { type: String, required: true },
});
schema.plugin(slug, { field: 'eventName' })

export default model<IEvent>('Event', schema);