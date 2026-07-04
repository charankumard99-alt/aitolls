import mongoose, { Schema, Document } from 'mongoose';

export interface IFAQ {
    q: string;
    a: string;
}

export interface ITool extends Document {
    title: string;
    description: string;
    icon: string;
    heroBanner?: string;
    url: string;
    category: string; // Slug key
    categoryLabel: string;
    price: string; // "Free", "$15/mo", etc.
    rating: number;
    users: string;
    isTrending: boolean;
    isFeatured: boolean;
    isNew: boolean;
    isEditorsChoice: boolean;
    isRecommended: boolean;
    pros: string[];
    cons: string[];
    faqs: IFAQ[];
}

const FAQSchema = new Schema<IFAQ>({
    q: { type: String, required: true },
    a: { type: String, required: true }
}, { _id: false });

const ToolSchema = new Schema<ITool>({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    heroBanner: { type: String },
    url: { type: String, required: true },
    category: { type: String, required: true, index: true },
    categoryLabel: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    users: { type: String, default: '10K+' },
    isTrending: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isEditorsChoice: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: false },
    pros: [{ type: String }],
    cons: [{ type: String }],
    faqs: [FAQSchema]
}, { timestamps: true });

export default mongoose.model<ITool>('Tool', ToolSchema);
