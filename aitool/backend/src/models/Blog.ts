import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string; // e.g. "AI News", "AI Tutorials", etc.
    tags: string[];
    image?: string;
}

const BlogSchema = new Schema<IBlog>({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    image: { type: String }
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
