
import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  proficiency: number;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

export default mongoose.model<ISkill>('Skill', SkillSchema);
