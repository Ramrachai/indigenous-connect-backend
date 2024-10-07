import mongoose, { Document, Schema } from 'mongoose';

export interface EventModelType extends Document {
    title: string;
    description: string;
    location: string;
    date: Date;
    createdBy: mongoose.Types.ObjectId; 
    attendees: mongoose.Types.ObjectId[]; 
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema: Schema = new Schema<EventModelType>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
}, {
    timestamps: true, 
});

const Event = mongoose.model<EventModelType>('Event', EventSchema);

export default Event;
