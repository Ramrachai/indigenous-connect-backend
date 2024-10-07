// server/src/models/UserAnalytics.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserAnalytics extends Document {
    ipAddress: string;
    country: string;
    pageViews: number;
    lastVisit: Date;
    totalTimeSpent: number;
    averageTimePerVisit: number;
}

const UserAnalyticsSchema: Schema = new Schema({
    ipAddress: { type: String, required: true, unique: true },
    country: { type: String, default: 'Unknown' },
    pageViews: { type: Number, default: 0 },
    lastVisit: { type: Date, default: Date.now },
    totalTimeSpent: { type: Number, default: 0 }, // in seconds
    averageTimePerVisit: { type: Number, default: 0 } // in seconds
});

export default mongoose.model<IUserAnalytics>('UserAnalytics', UserAnalyticsSchema);