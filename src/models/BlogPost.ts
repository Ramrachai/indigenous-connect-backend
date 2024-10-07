import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User'; 
import { IComment } from './Comment';

export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: IUser;
  category: string;
  readTime: number; 
  image: string; 
  featured: boolean; 
  likes: number; 
  shares: number; 
  comments: IComment[]; 
  viewCount: number; 
  createdAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    category: { type: String, required: true },
    readTime: { type: Number, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false }, 
    likes: { type: Number, default: 0 }, 
    shares: { type: Number, default: 0 }, 
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], 
    viewCount: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
