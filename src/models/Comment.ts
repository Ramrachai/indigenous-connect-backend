// server/src/models/Comment.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  blogPost: mongoose.Types.ObjectId;
  author: string;
  content: string;
  createdAt: Date;
  isApproved: boolean;
  parentComment?: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  blogPost: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
  parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' },
});

export default mongoose.model<IComment>('Comment', CommentSchema);