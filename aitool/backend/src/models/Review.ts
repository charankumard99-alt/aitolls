import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
    toolId: mongoose.Types.ObjectId;
    userId: string; // Firebase Auth UID
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

const ReviewSchema = new Schema<IReview>({
    toolId: { type: Schema.Types.ObjectId, ref: 'Tool', required: true, index: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IReview>('Review', ReviewSchema);
