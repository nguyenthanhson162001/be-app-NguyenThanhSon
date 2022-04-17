import { Event, IEvent } from '..//app/model/index'
export const getEventBySlug = async (slug: string): Promise<IEvent | null> => {
    return await Event.findOne({ slug: slug });
}
