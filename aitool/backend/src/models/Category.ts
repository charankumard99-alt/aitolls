import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    title: string;
    icon: string;
    slug: string;
    count: number;
}

const CategorySchema = new Schema<ICategory>({
    title: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    count: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<ICategory>('Category', CategorySchema);
